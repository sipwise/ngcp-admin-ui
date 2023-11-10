import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        billingFeeContext () {
            return this.getDataContextObject('billingFeeContext')
        },
        billingFeeContextId () {
            return this.$route.params.billingFeeId
        },
        billingFeeContextZones () {
            return this.billingFeeContext?.billing_zone_id_expand
        },
        billingFeeContextExpand () {
            return [
                'billing_profile_id',
                'billing_zone_id'
            ]
        }
    },
    methods: {
        async reloadBillingFeeContext () {
            await this.reloadDataContext('billingFeeContext')
        }
    }
}
