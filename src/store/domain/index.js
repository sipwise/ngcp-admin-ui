import * as actions from 'src/store/domain/actions'
import * as getters from 'src/store/domain/getters'
import * as mutations from 'src/store/domain/mutations'
import state from 'src/store/domain/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
