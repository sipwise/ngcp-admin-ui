import * as actions from 'src/store/dataTable/actions'
import * as getters from 'src/store/dataTable/getters'
import * as mutations from 'src/store/dataTable/mutations'
import state from 'src/store/dataTable/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
