<template>
    <q-select
        v-model="status"
        emit-value
        map-options
        :options="options"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiSelectionResellerStatus',
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            status: null
        }
    },
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
    },
    mounted () {
        this.status = this.value
    }
}
</script>
