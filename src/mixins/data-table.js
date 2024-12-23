export default {
    computed: {
        terminationLabel () {
            return this.$t('Terminate')
        },
        terminationTitle () {
            return 'Terminate {resource}'
        },
        terminationText () {
            return 'You are about to terminate {resource} {subject}'
        }
    },
    methods: {
        async refresh () {
            if (this.$refs.dataTable) {
                await this.$refs.dataTable.refresh({ force: true })
            }
        }
    }
}
