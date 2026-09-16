# Composition API

We're moving off Options API + mixins to `<script setup>` + composables. We
do this opportunistically: only convert a file when you're already touching
it for a feature or bugfix.

## Rule 1: Composition API code only touches Vuex through a composable

A `<script setup>` component never calls `useStore()` itself. It calls a
domain composable (`useDataContext()`, `useWait()`, `useSubContext()`, etc.)
and that composable is the only thing that knows Vuex exists.

This rule is about Composition API code specifically. It does **not** touch
the existing `mapState`/`mapGetters`/`mapActions`/`mapMutations` usages
in Options API files: those stay exactly as they are, coexisting
indefinitely, same as any other mixin.

**Why**: if components never talk to Vuex directly, they never need to know
module names or state shapes. So if we ever move from Vuex to Pinia later,
we'd only have to rewrite the composables and not every component that uses
them. We're doing this now because the team is small and a Pinia migration
isn't a priority yet. Think of it as prep work for our future selves.

The known downside of "every case gets a composable" is a growing file count.
Before writing a new one, check whether an existing composable already
covers the same store module or shape and just needs a parameter.

**Enforcement**: ESLint (`no-restricted-imports` in `eslint.config.mjs`) blocks
importing `useStore` from `vuex` anywhere outside `src/composables/**`. It
only restricts `useStore` (`mapState`/`mapGetters`/`mapActions`/
`mapMutations` are untouched since Options API files still need them).

Treat both lint rules as guardrails against accident, not as walls. They only
catch the obvious form of the mistake.

## Rule 2: dispatch actions, never commit mutations

A composable writes to the store through an action, never `store.commit()`
directly. No action yet? Add one:

```js
// src/store/page/actions.js
export function destroyDataContext ({ commit }, { resourceObjectId }) {
    commit('destroyDataContext', { resourceObjectId })
}
```

```js
// src/composables/useDataContext.js
function destroy () {
    store.dispatch('page/destroyDataContext', { resourceObjectId })
}
```

**Why**: Pinia has no `commit` in fact actions just assign state directly,
so an existing Vuex action converts in place later (inline the mutation,
delete it). Skip the action and commit directly, and there's nothing to
convert; you'd invent the action at migration time instead of now.

**Enforcement**: ESLint blocks any `.commit(...)` call inside
`src/composables/**/*.js` (see `no-restricted-syntax` in
`eslint.config.mjs`). Tests are the one exception: they're allowed to seed
store state with `commit()` directly.

## Rule 3: leave Options API wrapper components alone

A `<script setup>` component can use an Options API component exactly like
before, as parent or child. Props and slots don't care which API style
either side is written in. So `AuiDataContext.vue` and
`AuiBaseSubContext.vue` stay Options API; converted pages keep using them in
the template unchanged. Write a composable only when a component needs that
state *without* going through one of these wrappers. That's what
`useSubContext()` is for.

**The data-table pattern is the biggest example of this.** `aui-data-table`
plus the `dataTable`/`dataTableColumn` mixins is the single most common page
shape in the app. Its Vuex access lives entirely inside `AuiDataTable.vue`
itself: the mixins are pure column/config logic with no store access at
all. So converting a list page needs **no new composable**: keep
`<aui-data-table>` in the template as-is, and move the column-definition
logic into `<script setup>` directly. Leave `AuiDataTable.vue` itself
alone. It's large and shared by every list page, so only touch it when a
real bug or feature already requires being in that file.

## Writing a composable

Before you write one, check it earns its file. A composable should expose the
*page's* vocabulary (`subscriber`, `isPbxPilot`, `reload`), not the *store's*
(`dispatch('subscribers/load')`). If all it does is rename store actions
one-for-one, it isn't a composable, it's a pass-through layer — use an existing
one, or add a parameter to it, instead.

**Data-context pages: don't write a new mechanism.** `src/mixins/data-context-pages/`
has ~46 mixins and they nearly all have the same shape: a `resourceObjectId`
constant, a resource name, an id read off a route param, an expand list, some
derived computeds, and a `reloadXxxContext`. `useDataContext()` already *is*
that mechanism. A per-domain composable should wrap it and add only the fields
that genuinely derive something:

```js
export function useSubscriberContext ({ resourceObjectId = 'subscriberContext', resourceId } = {}) {
    const { object: subscriber, loading, load, reload } = useDataContext({
        resourceObjectId,
        resource: 'subscribers',
        resourceId,
        resourceExpand: RESOURCE_EXPAND
    })
    const customer = computed(() => subscriber.value?.customer_id_expand)
    // ...only what actually derives something
    return { subscriber, customer, loading, load, reload }
}
```

`src/composables/useSubscriberContext.js` is the reference. Note it deliberately
drops the `subscriberContext` prefix the mixin put on every field: inside a
composable the name is already scoped, so `subscriberContextIsPbxPilot` becomes
`isPbxPilot`.

- One file, one export: `src/composables/useXxx.js` --> `useXxx()`.
- Test file next to it: `useXxx.jest.spec.js`.
- Test against a real, minimal, hand-built Vuex store. No need to mock it.
  A composable has to run inside a component, so mount a throwaway one and
  call it from `setup()`. Both helpers for this live in
  `src/composables/composableTestHelpers.js` (note The file is not named
  `*.jest.spec.js`, so jest doesn't try to collect it as a test suite.)

```js
import { createWaitModule, mountComposable } from 'src/composables/composableTestHelpers'

const store = createStore({ modules: { wait: createWaitModule(), page: /* ... */ } })
const { wrapper, result } = mountComposable(() => useXxx({ /* ... */ }), store)
```

- Accept reactive params as a ref, getter, or plain value, and read them
  with `toValue()`, e.g. `resourceId: () => route.params.lnpCarrierId`.
  `toValue(x)` is Vue's "unwrap whatever this is" helper: it returns `x` for a
  plain value, `x.value` for a ref, and `x()` for a getter function. Taking a
  getter is what lets a composable react to something that changes later, like
  a route param.
- Call it, and anything it registers (like `onMounted`/`watch`), only at
  the top level of `setup()`/`<script setup>`. Never inside an `if`/`for`,
  and never after an `await`. Lifecycle hooks silently do nothing if
  registered outside the synchronous part of setup: no error, just a hook
  that never fires.
- Return individual `ref`/`computed` values (or `toRefs()`), never a single
  `reactive()` object for the caller to destructure. Destructuring
  `reactive()` silently drops reactivity on the fields you pull out.
- Declare state inside the function body, not at module scope, unless you
  deliberately want every caller to share the same instance. State declared
  outside `export function useXxx()` is a singleton: every component
  calling it gets the same data, not its own.

## Converting a component

As a general rule, we convert components, only when we're already touching
the file for a feature or bugfix.

Mixins and composables will coexist. Both read/write the same Vuex state,
so a converted file and its unconverted siblings stay in sync. Never edit a
shared mixin to "prepare" it for extraction. Write the composable fresh from
the mixin's current behavior, swap the import in the file you're converting,
and leave the mixin alone. Delete a mixin only once its last consumer has
converted.

Quick Swap list:

- `mapState`/`mapGetters`/`mapActions`/`mapMutations` or a store-touching mixin
  --> the matching composable (write one if it doesn't exist)
- `this.$t` --> `useI18n().t`
- `this.$route` / `this.$router` --> `useRoute()` / `useRouter()`
- `this.$refs.x` --> a template `ref()`
- `mounted`/`unmounted` --> `onMounted`/`onUnmounted`
- `name: 'AuiFoo'` --> `defineOptions({ name: 'AuiFoo' })`. Keep it: without an
  explicit name `<script setup>` infers one from the filename, and the name is
  what shows up in Vue DevTools and in the `data-cy` attributes
  `src/boot/e2e-testing.js` generates.
- Options API components it renders --> leave alone (rule 3)

Two `<script setup>` traps worth knowing before you start:

- **`<script setup>` is closed by default.** In an Options API component every
  method was reachable from a parent via `this.$refs.child.someMethod()`. In
  `<script setup>` nothing is exposed unless you list it in
  `defineExpose({ someMethod })`. There is no error if you forget — the parent
  just silently calls `undefined`. This codebase calls methods through refs,
  so before converting a component, grep for its name and check
  whether a parent does this to it. (Handlers used only inside your *own*
  template, like `@refresh="refresh"`, need nothing.)
- **`:key` on a route view is not always a hack.** On `<aui-data-context>` the
  `:key="someId"` idiom was doing two separate jobs: forcing a *reload* of the
  context, and forcing the child subtree to *remount*. `useDataContext()` now
  owns the reload — it watches the id you pass and, when it changes, clears the
  old object before loading the new one, so nothing renders stale data. It does
  not remount anything. If the pages under this route hold per-resource state
  that only initialises on mount (a one-shot flag in `data()`, an
  `<aui-data-table>` whose resource path embeds the id — it fetches in
  `mounted()` and has no watcher), keep an explicit `:key` on the
  `<router-view>`. See `AuiSubscriberContext.vue`, which needs both halves and
  says why in a comment.

## Known warnings, unrelated to this migration

Two pre-existing library warnings show up in this area. Neither is caused by
anything above, and neither is currently broken. Documenting them here so
nobody re-investigates from scratch or mistakes them for a bug in a
conversion.

- **`yarn install` peer-dependency warning for `vue-wait`**: `vue-wait@1.5.3`'s
  `package.json` still declares `peerDependencies: { vue: "^2.5.16" }`, even
  though its actual code already branches on the detected Vue version
  internally and supports Vue 3 fine. `vue-wait-vue3@1.5.3` on npm is the same
  code republished with a corrected peer range (`^2.5.16 || ^3.0.0`), verified
  byte-for-byte identical otherwise. Switching would only silence the warning,
  not fix anything that's actually broken.
- **vue-i18n's "Legacy API mode has been deprecated" console warning**:
  `src/boot/i18n.js` doesn't set `legacy: false` on `createI18n()`, so the app
  runs in vue-i18n's default legacy mode, which prints a one-time dev-console
  warning. This is unrelated to `useI18n()` usage: calling `useI18n()` with no
  arguments (as in `AuiResellerBaseInformation.vue`) correctly resolves to the
  same global translation composer `this.$t()` uses everywhere else (checked
  against vue-i18n's own source: no local `<i18n>` block on the component means
  it resolves to global scope). Switching to `legacy: false` is vue-i18n's own
  recommendation and wouldn't break existing `this.$t()` calls
  (`globalInjection` already defaults to `true`), but hasn't been evaluated
  here for other legacy-mode-only behavior the app might still depend on.
  That's a separate decision from this migration.
