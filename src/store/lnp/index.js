import * as actions from 'src/store/lnp/actions'
import * as getters from 'src/store/lnp/getters'
import * as mutations from 'src/store/lnp/mutations'
import state from 'src/store/lnp/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
