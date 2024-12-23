import * as actions from 'src/store/securityBans/actions'
import * as getters from 'src/store/securityBans/getters'
import * as mutations from 'src/store/securityBans/mutations'
import state from 'src/store/securityBans/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
