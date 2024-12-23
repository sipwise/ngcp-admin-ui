import * as actions from 'src/store/user/actions'
import * as getters from 'src/store/user/getters'
import * as mutations from 'src/store/user/mutations'
import state from 'src/store/user/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
