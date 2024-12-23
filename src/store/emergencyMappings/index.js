import * as actions from 'src/store/emergencyMappings/actions'
import * as getters from 'src/store/emergencyMappings/getters'
import * as mutations from 'src/store/emergencyMappings/mutations'
import state from 'src/store/emergencyMappings/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
