import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    mixins: [dataContextPageMixin],
    computed: {
        billingVoucherContextId () {
            return 'billingVoucherContext'
        },
        billingVoucherContextResourceId () {
            return this.$route.params.id
        },
        billingVoucherContext () {
            return this.getDataContextObject(this.billingVoucherContextId)
        },
        billingVoucherContextReseller () {
            return this.billingVoucherContext?.reseller_id_expand
        },
        billingVoucherContextCustomer () {
            return this.billingVoucherContext?.customer_id_expand
        },
        billingVoucherContextCustomerContact () {
            return this.billingVoucherContext?.customer_id_expand?.contact_id_expand
        },
        billingVoucherContextPackage () {
            return this.billingVoucherContext?.package_id_expand
        },
        billingVoucherContextExpand () {
            return [
                'reseller_id',
                'customer_id.contact_id',
                'package_id'
            ]
        }
    },
    methods: {
        async reloadBillingVoucherContext () {
            await this.reloadDataContext(this.billingVoucherContextId)
        }
    }
}
