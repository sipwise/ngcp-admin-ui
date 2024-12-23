import * as actions from 'src/store/customers/actions'
import * as getters from 'src/store/customers/getters'
import * as mutations from 'src/store/customers/mutations'
import state from 'src/store/customers/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
