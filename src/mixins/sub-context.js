
export default {
    computed: {
        resourceObject () {
            return this.$store.state.page.resourceObject
        },
        resourceRelatedObjects () {
            return this.$store.state.page.resourceRelatedObjects
        },
        resourceRelatedSubObjects () {
            return this.$store.state.page.resourceRelatedSubObjects
        }
    }
}
