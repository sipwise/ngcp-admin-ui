import * as actions from 'src/store/soundSets/actions'
import * as getters from 'src/store/soundSets/getters'
import * as mutations from 'src/store/soundSets/mutations'
import state from 'src/store/soundSets/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
