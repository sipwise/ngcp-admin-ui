import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import _ from 'lodash'

export default {
    mixins: [dataContextPageMixin],
    data () {
        return {
            customerContextSubscribers: null
        }
    },
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
        },
        customerContextHasSubscribers () {
            return _.get(this.customerContextSubscribers, 'items', []).length > 0
        },
        customerContextHasPilot () {
            return this.customerContextHasSubscribers
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            fetchCustomerSubscribers: WAIT_PAGE,
            assignNumberToSubscriber: WAIT_PAGE,
            assignNumbersToSubscriber: WAIT_PAGE,
            unassignNumbers: WAIT_PAGE
        }),
        async reloadCustomerContext () {
            await this.reloadDataContext(this.customerContextId)
        },
        async fetchCustomerContextSubscribers () {
            this.customerContextSubscribers = await this.fetchCustomerSubscribers(this.customerContextResourceId)
        }
    }
}
