import * as actions from 'src/store/invoices/actions'
import * as getters from 'src/store/invoices/getters'
import * as mutations from 'src/store/invoices/mutations'
import state from 'src/store/invoices/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
