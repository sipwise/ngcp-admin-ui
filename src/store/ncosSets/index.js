import * as actions from 'src/store/ncosSets/actions'
import * as getters from 'src/store/ncosSets/getters'
import * as mutations from 'src/store/ncosSets/mutations'
import state from 'src/store/ncosSets/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
