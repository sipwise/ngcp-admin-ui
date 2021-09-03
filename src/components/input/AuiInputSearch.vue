<template>
    <q-input
        ref="inputSearch"
        :value="$attrs.value"
        clearable
        debounce="300"
        :label="$t('Search')"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-slot:prepend
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
