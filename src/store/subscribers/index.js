import * as actions from 'src/store/subscribers/actions'
import * as getters from 'src/store/subscribers/getters'
import * as mutations from 'src/store/subscribers/mutations'
import state from 'src/store/subscribers/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
