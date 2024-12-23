import * as actions from 'src/store/resellers/actions'
import * as getters from 'src/store/resellers/getters'
import * as mutations from 'src/store/resellers/mutations'
import state from 'src/store/resellers/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
