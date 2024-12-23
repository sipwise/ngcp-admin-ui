import * as actions from 'src/store/billing/actions'
import * as getters from 'src/store/billing/getters'
import * as mutations from 'src/store/billing/mutations'
import state from 'src/store/billing/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
