import * as actions from 'src/store/callFlow/actions'
import * as getters from 'src/store/callFlow/getters'
import * as mutations from 'src/store/callFlow/mutations'
import state from 'src/store/callFlow/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
