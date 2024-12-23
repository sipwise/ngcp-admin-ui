import * as actions from 'src/store/headerRuleSets/actions'
import * as getters from 'src/store/headerRuleSets/getters'
import * as mutations from 'src/store/headerRuleSets/mutations'
import state from 'src/store/headerRuleSets/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
