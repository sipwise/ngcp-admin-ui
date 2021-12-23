export default {
    computed: {
        initialFormData () {
            return this.$store.state.creationSession.currentFormData
        }
    }
}
