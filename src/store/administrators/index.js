import * as actions from 'src/store/administrators/actions'
import * as getters from 'src/store/administrators/getters'
import * as mutations from 'src/store/administrators/mutations'
import state from 'src/store/administrators/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
