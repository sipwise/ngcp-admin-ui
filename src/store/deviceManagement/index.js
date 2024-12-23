import * as actions from 'src/store/deviceManagement/actions'
import * as getters from 'src/store/deviceManagement/getters'
import * as mutations from 'src/store/deviceManagement/mutations'
import state from 'src/store/deviceManagement/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
