import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
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
                'profile_id',
                'profile_set_id',
                'customer_id',
                'customer_id.contact_id',
                'pbx_group_ids',
                'pbx_groupmember_ids'
            ]
        },
        subscriberContextRelations () {
            return {
                pbx_group_ids: {
                    name: 'pbxGroups',
                    type: Array,
                    resource: 'subscribers'
                },
                pbx_groupmember_ids: {
                    name: 'pbxGroupMembers',
                    type: Array,
                    resource: 'subscribers'
                }
            }
        },
        subscriberContext () {
            return this.getDataContextObject(this.subscriberContextId)
        },
        subscriberContextCustomer () {
            return this.subscriberContext?.['customer_id_expand']
        },
        subscriberContextContact () {
            return this.subscriberContext?.['customer_id_expand']?.['contact_id_expand']
        },
        subscriberContextCustomerIsPbx () {
            return this.subscriberContextCustomer?.type === 'pbxaccount'
        },
        subscriberContextDomain () {
            return this.subscriberContext?.['domain_id_expand']
        },
        subscriberContextProfileSet () {
            return this.subscriberContext?.['profile_set_id_expand']
        },
        subscriberContextProfile () {
            return this.subscriberContext?.['profile_id_expand']
        },
        subscriberContextIsPbxPilot () {
            return this.subscriberContext.is_pbx_pilot
        },
        subscriberContextIsPbxGroup () {
            return this.subscriberContext.is_pbx_group
        },
        subscriberContextIsPbxSeat () {
            return !this.subscriberContextIsPbxPilot &&
                !this.subscriberContextIsPbxGroup &&
                this.subscriberContextCustomerIsPbx
        }
    },
    methods: {
        async reloadSubscriberContext () {
            await this.reloadDataContext(this.subscriberContextId)
        }
    }
}
