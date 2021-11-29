
export default {
    computed: {
        terminationLabel () {
            return this.$t('Terminate')
        },
        terminationTitle () {
            return this.$t('Terminate {resource}')
        },
        terminationText () {
            return this.$t('You are about to terminate {resource} {subject}')
        }
    }
}
