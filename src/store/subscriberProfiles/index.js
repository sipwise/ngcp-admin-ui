import * as actions from 'src/store/subscriberProfiles/actions'
import * as getters from 'src/store/subscriberProfiles/getters'
import * as mutations from 'src/store/subscriberProfiles/mutations'
import state from 'src/store/subscriberProfiles/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
