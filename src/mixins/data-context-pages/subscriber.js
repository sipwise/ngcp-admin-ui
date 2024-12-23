import dataContextPageMixin from 'src/mixins/data-context-page'
import subscriberCommonMixin from 'src/mixins/data-context-pages/subscriber-common'

export default {
    mixins: [
        dataContextPageMixin,
        subscriberCommonMixin
    ],
    computed: {
        subscriberContextId () {
            return 'subscriberContext'
        },
        subscriberContextResource () {
            return 'subscribers'
        },
        subscriberContextResourceId () {
            return this.$route.params.id
        },
        subscriberContextExpand () {
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
        subscriberContext () {
            return this.getDataContextObject(this.subscriberContextId)
        },
        subscriberContextCustomer () {
            return this.subscriberContext?.customer_id_expand
        },
        subscriberContextContact () {
            return this.subscriberContext?.customer_id_expand?.contact_id_expand
        },
        subscriberContextCustomerIsPbx () {
            return this.subscriberContextCustomer?.type === 'pbxaccount'
        },
        subscriberContextDomain () {
            return this.subscriberContext?.domain_id_expand
        },
        subscriberContextReseller () {
            return this.subscriberContext?.domain_id_expand?.reseller_id_expand
        },
        subscriberContextProfileSet () {
            return this.subscriberContext?.profile_set_id_expand
        },
        subscriberContextProfile () {
            return this.subscriberContext?.profile_id_expand
        },
        subscriberContextPbxGroups () {
            return this.subscriberContext?.pbx_group_ids_expand
        },
        subscriberContextPbxGroupMembers () {
            return this.subscriberContext?.pbx_groupmember_ids_expand
        },
        subscriberContextIsPbxPilot () {
            return this.subscriberContextCustomerIsPbx && this.subscriberContext.is_pbx_pilot
        },
        subscriberContextIsPbxGroup () {
            return this.subscriberContextCustomerIsPbx && this.subscriberContext.is_pbx_group
        },
        subscriberContextIsPbxSeat () {
            return !this.subscriberContextIsPbxPilot &&
                !this.subscriberContextIsPbxGroup &&
                this.subscriberContextCustomerIsPbx
        },
        subscriberContextType () {
            if (this.subscriberContextIsPbxPilot) {
                return 'pbx-pilot'
            } else if (this.subscriberContextIsPbxGroup) {
                return 'pbx-group'
            } else if (this.subscriberContextIsPbxSeat) {
                return 'pbx-seat'
            }
            return 'subscriber'
        }
    },
    methods: {
        async reloadSubscriberContext () {
            await this.reloadDataContext(this.subscriberContextId)
        }
    }
}
