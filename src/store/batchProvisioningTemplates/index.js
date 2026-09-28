import * as actions from 'src/store/batchProvisioningTemplates/actions'
import * as getters from 'src/store/batchProvisioningTemplates/getters'
import * as mutations from 'src/store/batchProvisioningTemplates/mutations'
import state from 'src/store/batchProvisioningTemplates/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
