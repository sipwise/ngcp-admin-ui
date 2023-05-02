<template>
    <q-input
        ref="inputSearch"
        :model-value="$attrs.value"
        clearable
        debounce="500"
        :label="$t('Search')"
        v-bind="$attrs"
    >
        <template
            #prepend
        >
            <q-icon
                name="search"
            />
        </template>
    </q-input>
</template>

<script>
export default {
    name: 'AuiInputSearch',
    methods: {
        focus () {
            this.$refs.inputSearch.focus()
        }
    }
}
</script>
