import * as actions from 'src/store/creationSession/actions'
import * as getters from 'src/store/creationSession/getters'
import * as mutations from 'src/store/creationSession/mutations'
import state from 'src/store/creationSession/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
