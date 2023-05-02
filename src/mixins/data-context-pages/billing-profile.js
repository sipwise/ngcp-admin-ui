import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        billingProfileContextId () {
            return 'billingProfileContext'
        },
        billingProfileContextResource () {
            return 'billingprofiles'
        },
        billingProfileContextResourceId () {
            return this.$route.params.id
        },
        billingProfileContextExpand () {
            return [
                'reseller_id'
            ]
        },
        billingProfileContext () {
            return this.getDataContextObject(this.billingProfileContextId)
        },
        billingProfileContextReseller () {
            return this.billingProfileContext?.reseller_id_expand
        }
    },
    methods: {
        async reloadBillingProfileContext () {
            await this.reloadDataContext(this.billingProfileContextId)
        }
    }
}
