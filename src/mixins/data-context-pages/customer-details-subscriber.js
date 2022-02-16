import dataContextPageMixin from 'src/mixins/data-context-page'
import subscriberCommonMixin from 'src/mixins/data-context-pages/subscriber-common'

export default {
    mixins: [
        dataContextPageMixin,
        subscriberCommonMixin
    ],
    computed: {
        customerSubscriberContextContextId () {
            return 'customerSubscriberContext'
        },
        customerSubscriberContextResource () {
            return 'subscribers'
        },
        customerSubscriberContextResourceId () {
            return this.$route.params.subscriberId
        },
        customerSubscriberContextResourceExpand () {
            return [
                'domain_id',
                'domain_id.reseller_id',
                'profile_id',
                'profile_set_id',
                'customer_id',
                'customer_id.contact_id',
                'pbx_group_ids',
                'pbx_groupmember_ids'
            ]
        },
        customerSubscriberContextResourceFilters () {
            return {
                customer_id: this.$route.params.id
            }
        },
        customerSubscriberContext () {
            return this.getDataContextObject(this.customerSubscriberContextContextId)
        },
        customerSubscriberContextDomain () {
            return this.customerSubscriberContext?.['domain_id_expand']
        },
        customerSubscriberContextCustomer () {
            return this.customerSubscriberContext?.['customer_id_expand']
        },
        customerSubscriberContextPbxGroups () {
            return this.customerSubscriberContext?.['pbx_group_ids_expand']
        },
        customerSubscriberContextProfileSet () {
            return this.customerSubscriberContext?.['profile_set_id_expand']
        },
        customerSubscriberContextProfile () {
            return this.customerSubscriberContext?.['profile_id_expand']
        },
        customerSubscriberContextCustomerIsPbx () {
            return this.customerSubscriberContextCustomer?.['type'] === 'pbxaccount'
        },
        customerSubscriberContextIsPilot () {
            return this.customerSubscriberContext?.['is_pbx_pilot']
        },
        customerSubscriberContextIsSeat () {
            return this.customerSubscriberContextCustomerIsPbx &&
                !this.customerSubscriberContextIsPilot &&
                !this.customerSubscriberContext?.['is_pbx_group']
        }
    },
    methods: {
        async loadCustomerSubscriberContext () {
            await this.loadDataContext({
                resourceObjectId: this.customerSubscriberContextContextId,
                resource: this.customerSubscriberContextResource,
                resourceId: this.customerSubscriberContextResourceId,
                resourceExpand: this.customerSubscriberContextResourceExpand,
                resourceFilters: this.customerSubscriberContextResourceFilters
            })
        },
        async reloadCustomerSubscriberContext () {
            await this.reloadDataContext(this.customerSubscriberContextContextId)
        }
    }
}
