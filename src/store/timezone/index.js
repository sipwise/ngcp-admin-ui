import * as actions from 'src/store/timezone/actions'
import * as getters from 'src/store/timezone/getters'
import * as mutations from 'src/store/timezone/mutations'
import state from 'src/store/timezone/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
