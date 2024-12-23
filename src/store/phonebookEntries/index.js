import * as actions from 'src/store/phonebookEntries/actions'
import * as getters from 'src/store/phonebookEntries/getters'
import * as mutations from 'src/store/phonebookEntries/mutations'
import state from 'src/store/phonebookEntries/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
