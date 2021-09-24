<template>
    <q-select
        :label="$t('Lock Level')"
        :value="$attrs.value"
        emit-value
        map-options
        dense
        :options="options"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiSelectionLockLevel',
    computed: {
        options () {
            return [
                {
                    value: null,
                    label: this.$t('None')
                },
                {
                    value: 1,
                    label: this.$t('Foreign')
                },
                {
                    value: 2,
                    label: this.$t('Outgoing')
                },
                {
                    value: 3,
                    label: this.$t('All calls')
                },
                {
                    value: 4,
                    label: this.$t('Global')
                },
                {
                    value: 5,
                    label: this.$t('Ported')
                }
            ]
        }
    }
}
</script>
