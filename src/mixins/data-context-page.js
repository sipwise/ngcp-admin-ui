import _ from 'lodash'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'

export default {
    methods: {
        ...mapWaitingActions('page', {
            reloadDataContext: WAIT_PAGE,
            loadDataContext: WAIT_PAGE
        }),
        getDataContextObject (id) {
            return this.$store.state.page[id]
        },
        getDataContextRelatedObject (id, name) {
            return _.get(this.$store.state.page, `${id}_ResourceRelatedObjects.${name}`)
        },
        getDataContextRelatedSubObject (id, name) {
            return this.$store.state.page[`${id}_ResourceRelatedSubObjects`][name]
        }
    }
}
