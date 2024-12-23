import * as actions from 'src/store/contact/actions'
import * as getters from 'src/store/contact/getters'
import * as mutations from 'src/store/contact/mutations'
import state from 'src/store/contact/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
