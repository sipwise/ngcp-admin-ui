import * as actions from 'src/store/peering/actions'
import * as getters from 'src/store/peering/getters'
import * as mutations from 'src/store/peering/mutations'
import state from 'src/store/peering/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
