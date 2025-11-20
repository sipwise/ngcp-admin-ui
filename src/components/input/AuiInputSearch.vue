<template>
    <q-input
        ref="inputSearch"
        :model-value="$attrs.value"
        clearable
        debounce="1000"
        :label="$t('Search')"
        v-bind="$attrs"
    >
        <q-tooltip
            v-if="tooltip"
        >
            {{ tooltip }}
        </q-tooltip>
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
    props: {
        tooltip: {
            type: String,
            default: null
        }
    },
    methods: {
        focus () {
            this.$refs.inputSearch.focus()
        }
    }
}
</script>
