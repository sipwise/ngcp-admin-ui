import * as actions from 'src/store/invoiceTemplates/actions'
import * as getters from 'src/store/invoiceTemplates/getters'
import * as mutations from 'src/store/invoiceTemplates/mutations'
import state from 'src/store/invoiceTemplates/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
