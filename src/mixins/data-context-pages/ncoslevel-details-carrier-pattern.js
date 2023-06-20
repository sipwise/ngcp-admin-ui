import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        ncoslevelCarrierPatternContext () {
            return this.getDataContextObject('ncosLevelsDetailsLnpCarrierPatternContext')
        },
        ncoslevelCarrierPatternContextId () {
            return this.$route.params.lnpCarrierPatternId
        }
    },
    methods: {
        async reloadNcoslevelCarrierPatternContext () {
            await this.reloadDataContext('ncosLevelsDetailsLnpCarrierPatternContext')
        }
    }
}
