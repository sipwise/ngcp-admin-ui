import * as actions from 'src/store/page/actions'
import * as getters from 'src/store/page/getters'
import * as mutations from 'src/store/page/mutations'
import state from 'src/store/page/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
