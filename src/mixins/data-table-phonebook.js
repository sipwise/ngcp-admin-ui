
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
        }
    }
}
