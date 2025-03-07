import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'

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
    },
    methods: {
        ...mapWaitingActions('page', {
            reloadContext: WAIT_PAGE
        })
    }
}
