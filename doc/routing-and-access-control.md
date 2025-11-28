# Routing & Access Control (detailed)

This document describes the routing system, route guards and ACL integration used in the application, with concrete examples from the repo.

## Key files
- `src/router/*` — route definitions and router setup (entry usually `src/router/index.js`)
- `src/boot/acl.js` — registers the global route guard and bootstraps ACL helpers (see example below)
- `src/acl/*` — ACL implementation (helpers: aclCan, aclSet, ...)
- `src/boot/store` — provides `store.$routeMeta` used by the guard
- `src/router/common` — common router constants (e.g. `PATH_ERROR_403`)

## High-level behavior
- A global router guard runs on every navigation and decides whether the route is accessible for the current user.
- The guard delegates the access decision to `store.$routeMeta.$isRouteAccessible(to, user)`.
- If access is denied the router redirects to a 403 error route (`PATH_ERROR_403`).
- ACL helpers are initialized from the user's permissions and exposed globally for components/templates.

## Global guard (actual repo example)
The guard is registered in `src/boot/acl.js`. This is the authoritative check for route access:

```js
//ngcp-admin-ui/src/boot/acl.js
router.beforeEach((to, from, next) => {
    if (store.$routeMeta.$isRouteAccessible(to, store.state.user.user)) {
        next()
    } else {
        next(PATH_ERROR_403)
    }
})
// ...existing code...
```

Notes:
- `store.$routeMeta.$isRouteAccessible` is the function that evaluates route meta against the current `store.state.user.user`.
- `PATH_ERROR_403` is a router constant used to redirect unauthorized access.

## How route metadata is used
Each route can include a `meta` object used by the guard and by UI code. The guard expects route-specific access rules inside `meta`. Common meta fields used across the repo:

- `meta.requiresAuth` — route requires authenticated user
- `meta.$p` — required permission keys
- `meta.licenses` — used by license checks to hide/show routes based on available licenses
- `meta.platformVersions` — used to restrict route access based on platform version (e.g. PRO, CARRIER)
- `get label` — getter that provides the human-friendly route name (menu builders, breadcrumbs or UI code read route.meta.label to render the label. )
- `parentPath` — used by menu builders to determine parent-child relationships between routes
- `children` — used by menu builders to define child routes
- `contextRoot` — used by menu builders to group routes under a common root. Marks this route as the "resource context" or root page for an entity instance (the page that represents a single resource and hosts child views).
- `contextLabel` - used to compute a dynamic, resource-specific label for "context" routes (the routes that represent a single resource instance, i.e. routes with meta.contextRoot = true).
- `icon` — used by menu builders to show an icon for the route
- `hideFromPageMenu` — tells the UI not to show that route in the page-level/context menu (the list of actions/child pages shown inside a resource page).

Example route (illustrative; adapt to your actual routes file):

```js
{
    name: 'headerRuleConditionContext',
    path: 'conditions/:headerRuleConditionId',
    redirect: (to) => {
        return { name: 'headerRuleConditionEdit', params: to.params }
    },
    component: () => import('pages/header-manipulations-rules-conditions/AuiHeaderManipulationsRuleConditionContext'),
    props: true,
    meta: {
        $p: {
            operation: 'read',
            resource: 'entity.headerruleconditions'
        },
        contextRoot: true,
        contextLabel: ({ resourceObject }) => {
            return `#${resourceObject.id} - ${resourceObject.match_name}`
        },
        parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleConditions'
},
```

## store.$routeMeta
- Provided by a store plugin and contains helpers to evaluate route accessibility.
- `store.$routeMeta.$isRouteAccessible(route, user)` typically:
  - reads `route.meta` entries
  - checks user permissions/capabilities against required permissions
  - returns boolean

Guard: `src/boot/acl.js` calls `store.$routeMeta.$isRouteAccessible`.

## ACL initialization and helpers
During boot (`src/boot/acl.js`) the user's permissions are loaded into the ACL subsystem:

```js
// ngcp-admin-ui/src/boot/acl.js
aclSet(store.getters['user/permissions'])
app.config.globalProperties.$aclCan = aclCan
app.config.globalProperties.$aclSet = aclSet
app.config.globalProperties.$aclReset = aclReset
app.config.globalProperties.$aclResource = aclCanResource
app.config.globalProperties.$aclColumn = aclCanResourceColumn
store.$aclCan = aclCan
```

This exposes helper functions everywhere:
- In templates / scripts: `this.$aclCan('permission.key')`
- In store or plain JS: `store.$aclCan('permission.key')`

Use these helpers to hide/show UI elements rather than duplicating permission checks.

## Examples

Component template gating example:

```html
<button v-if="$aclCan('subscribers.create')">Create subscriber</button>
```

Component code gating example:

```js
// inside component script
if (this.$aclCan('subscribers.edit')) {
  // show edit UI or proceed
}
```

## License Handling in Carrier/PRO vs CE Platforms

### Context

On Carrier/PRO platforms, licenses control access to specific features and pages. The same logic is enforced in the backend: when a user with an expired license attempts to perform an action that requires an active license, the endpoint returns a **"license expired"** error.

On CE platforms, the license concept should be ignored.

### Current Implementation

License handling is currently implemented in several layers:

1. **Route-level handling (meta.licenses)**

   * At the route level, licenses are defined via `meta.licenses`.
   * In `MainLayout` and `AuiDetailsPage`, a watcher uses the `hasLicense` getter to verify whether the user has the required license to access that specific menu or feature.
   * If `hasLicense` returns `false`, the app displays a banner with the message:
     > *"Please contact your Account Manager to activate this feature."*
   * On CE platforms, this check always returns `true`, effectively disabling license restrictions in the frontend.

2. **Expired License banner in MainLayout**

   * `MainLayout` also shows a banner when one or more licenses have expired.
   * This happens when `this.platformInfo?.license_meta?.check` is not equal to `'ok'`.
   * On CE platforms, this banner is never displayed.
