import * as actions from 'src/store/emergencyContainers/actions'
import * as getters from 'src/store/emergencyContainers/getters'
import * as mutations from 'src/store/emergencyContainers/mutations'
import state from 'src/store/emergencyContainers/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
