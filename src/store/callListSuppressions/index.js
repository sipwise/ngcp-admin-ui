import * as actions from 'src/store/callListSuppressions/actions'
import * as getters from 'src/store/callListSuppressions/getters'
import * as mutations from 'src/store/callListSuppressions/mutations'
import state from 'src/store/callListSuppressions/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
