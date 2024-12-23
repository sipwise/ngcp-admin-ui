import * as actions from 'src/store/timeSets/actions'
import * as getters from 'src/store/timeSets/getters'
import * as mutations from 'src/store/timeSets/mutations'
import state from 'src/store/timeSets/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
