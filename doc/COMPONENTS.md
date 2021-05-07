#Component Framework

##How to migrate ListView

##How to migrate a CreationForm

First create a new page component under `src/pages` and follow the naming convention `Aui<EntitySingular>Creation.vue`

```vue
<template>
    <aui-base-add-page>
      ...
    </aui-base-add-page>
</template>

<script>
export default {
    name: 'Aui<EntitySingular>Creation'
}
</script>

```

The next step is to create the form itself. Go to `src/components/edit-forms` and create a new component.
The naming convention is `Aui<EntitySingular>Form.vue`.

The root element in the form component has to be a `q-form`.
The reason is, that the wrapper component needs it as orientation
to detect the form and pick the right component instance.

```vue
<template>
    <q-form>
      ...
    </q-form>
</template>

<script>
export default {
    name: 'Aui<EntitySingular>Form'
}
</script>

```

The form needs to implement the following interface:

```vue
<template>
    <q-form>
      ...
    </q-form>
</template>

<script>
export default {
    name: 'Aui<EntitySingular>Form',
    computed: {
        hasUnsavedData () {
          // Is supposed to check whether data changed compared to the initial data
        }
    },
    watch: {
      hasUnsavedData (value) {
          // Is supposed to propagate the change of the computed property "hasUnsavedData"
          this.$emit('has-unsaved-data', value)
          this.$parent.$emit('form-has-unsaved-data', value)
      }
    },
    methods: {
      reset () {
        // Is supposed to reset the form to the initial state
      },
      submit () {
          // Is supposed to submit the validated data
          this.$emit('input', {})
          this.$parent.$emit('form-input', {})
      }
    }
}
</script>

```

After creating the page and the form, we put both together.

```vue
<template>
    <aui-base-add-page
        @form-input="triggerCreation"
    >
        <aui-entitysingular-form />
    </aui-base-add-page>
</template>
<script>
export default {
    name: 'Aui<EntitySingular>Creation',
    methods: {
        async triggerCreation (data) {
        }
    }
}
</script>

```

##How to migrate EditForm

##How to migrate Preferences
