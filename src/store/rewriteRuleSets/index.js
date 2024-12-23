import * as actions from 'src/store/rewriteRuleSets/actions'
import * as getters from 'src/store/rewriteRuleSets/getters'
import * as mutations from 'src/store/rewriteRuleSets/mutations'
import state from 'src/store/rewriteRuleSets/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
