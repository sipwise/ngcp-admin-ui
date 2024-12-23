import * as actions from 'src/store/selectLazy/actions'
import generatorConfig from 'src/store/selectLazy/generatorConfig'
import * as getters from 'src/store/selectLazy/getters'
import * as mutations from 'src/store/selectLazy/mutations'
import state from 'src/store/selectLazy/state'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    generatorConfig
}
