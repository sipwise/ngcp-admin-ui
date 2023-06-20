import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        ncoslevelCarrierContext () {
            return this.getDataContextObject('ncosLevelsDetailsLnpCarrierContext')
        },
        ncoslevelCarrierContextId () {
            return this.$route.params.lnpCarrierId
        }
    },
    methods: {
        async reloadNcoslevelCarrierContext () {
            await this.reloadDataContext('ncosLevelsDetailsLnpCarrierContext')
        }
    }
}
