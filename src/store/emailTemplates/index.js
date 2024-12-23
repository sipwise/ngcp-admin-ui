import * as actions from 'src/store/emailTemplates/actions'
import * as getters from 'src/store/emailTemplates/getters'
import * as mutations from 'src/store/emailTemplates/mutations'
import state from 'src/store/emailTemplates/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
