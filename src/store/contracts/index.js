import * as actions from 'src/store/contracts/actions'
import * as getters from 'src/store/contracts/getters'
import * as mutations from 'src/store/contracts/mutations'
import state from 'src/store/contracts/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
