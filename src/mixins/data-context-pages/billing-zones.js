import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        billingZoneContext () {
            return this.getDataContextObject('billingZoneContext')
        },
        billingZoneContextId () {
            return this.$route.params.zonesId
        }
    },
    methods: {
        async reloadBillingZoneContext () {
            await this.reloadDataContext('billingZoneContext')
        }
    }
}
