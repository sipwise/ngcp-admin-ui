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
        customerContextRelations () {
            return {
                billing_profiles: {
                    name: 'billingProfiles',
                    type: Array,
                    resources: {
                        profile_id: {
                            name: 'profile',
                            resource: 'billingprofiles'
                        },
                        network_id: {
                            name: 'network',
                            resource: 'billingnetworks'
                        }
                    }
                },
                all_billing_profiles: {
                    name: 'allBillingProfiles',
                    type: Array,
                    resources: {
                        profile_id: {
                            name: 'profile',
                            resource: 'billingprofiles'
                        },
                        network_id: {
                            name: 'network',
                            resource: 'billingnetworks'
                        }
                    }
                }
            }
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
        },
        customerContextBillingProfiles () {
            return this.getDataContextRelatedObject(this.customerContextId, 'billingProfiles') || []
        },
        customerContextAllBillingProfiles () {
            return this.getDataContextRelatedObject(this.customerContextId, 'allBillingProfiles') || []
        }
    },
    methods: {
        async reloadCustomerContext () {
            await this.reloadDataContext(this.customerContextId)
        }
    }
}
