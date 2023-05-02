<template>
    <q-select
        :model-value="$attrs.value"
        emit-value
        map-options
        :options="options"
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiSelectionResellerStatus',
    computed: {
        options () {
            return [
                {
                    value: 'active',
                    label: this.$t('Active')
                },
                {
                    value: 'locked',
                    label: this.$t('Locked')
                },
                {
                    value: 'terminated',
                    label: this.$t('Terminated')
                }
            ]
        }
    }
}
</script>
