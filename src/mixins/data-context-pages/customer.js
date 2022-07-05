import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        customerContextId () {
            return 'customerContext'
        },
        customerContextResource () {
            return 'customers'
        },
        customerContextResourceId () {
            return this.$route.params.id
        },
        customerContextExpand () {
            return [
                'contact_id',
                'contact_id.reseller_id',
                'subscriber_email_template_id',
                'passreset_email_template_id',
                'invoice_email_template_id',
                'invoice_template_id',
                'billing_profile_id',
                'profile_package_id'
            ]
        },
        customerContext () {
            return this.getDataContextObject(this.customerContextId)
        },
        customerContextContact () {
            return this.customerContext?.['contact_id_expand']
        },
        customerContextReseller () {
            return this.customerContext?.['contact_id_expand']?.['reseller_id_expand']
        },
        customerContextIsPbx () {
            return this.customerContext?.type === 'pbxaccount'
        }
    },
    methods: {
        async reloadCustomerContext () {
            await this.reloadDataContext(this.customerContextId)
        }
    }
}
