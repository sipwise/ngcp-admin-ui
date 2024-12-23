import * as actions from 'src/store/country/actions'
import * as getters from 'src/store/country/getters'
import * as mutations from 'src/store/country/mutations'
import state from 'src/store/country/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
