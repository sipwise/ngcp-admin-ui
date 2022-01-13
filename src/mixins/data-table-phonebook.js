
export default {
    computed: {
        numberColumn () {
            return {
                name: 'number',
                label: this.$t('Number'),
                field: 'number',
                sortable: true,
                editable: true,
                component: 'input',
                align: 'left'
            }
        },
        sharedColumn () {
            return {
                name: 'shared',
                label: this.$t('Shared'),
                field: 'shared',
                sortable: true,
                editable: true,
                component: 'toggle',
                align: 'left'
            }
        }
    }
}
