import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'

export default {
    methods: {
        ...mapWaitingActions('page', {
            reloadDataContext: WAIT_PAGE
        }),
        getDataContextObject (id) {
            return this.$store.state.page[id]
        }
    }
}
