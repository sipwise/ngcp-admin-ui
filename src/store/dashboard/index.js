import * as actions from 'src/store/dashboard/actions'
import * as getters from 'src/store/dashboard/getters'
import * as mutations from 'src/store/dashboard/mutations'
import state from 'src/store/dashboard/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
