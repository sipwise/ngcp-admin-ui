import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'

export default {
    computed: {
        subscriberCommonPbxHuntPolicyOptions () {
            return [
                {
                    label: this.$t('Serial Ringing'),
                    value: 'serial'
                },
                {
                    label: this.$t('Parallel Ringing'),
                    value: 'parallel'
                },
                {
                    label: this.$t('Random Ringing'),
                    value: 'random'
                },
                {
                    label: this.$t('Circular Ringing'),
                    value: 'circular'
                }
            ]
        },
        subscriberCommonPbxHuntCancelModeOptions () {
            return [
                {
                    label: this.$t('Using Cancel'),
                    value: 'cancel'
                },
                {
                    label: this.$t('Using Bye'),
                    value: 'bye'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            assignNumbersToSubscriber: WAIT_PAGE,
            unassignNumbers: WAIT_PAGE
        }),
        async subscriberCommonAssignNumbers ({ assignedNumberIds, unassignedNumberIds, subscriberId, customerId }) {
            const requests = []
            if (assignedNumberIds && assignedNumberIds.length > 0) {
                requests.push(this.assignNumbersToSubscriber({
                    subscriberId: subscriberId,
                    numberIds: assignedNumberIds
                }))
            }
            if (unassignedNumberIds && unassignedNumberIds.length > 0) {
                requests.push(this.unassignNumbers({
                    customerId: customerId,
                    numberIds: unassignedNumberIds
                }))
            }
            if (requests.length > 0) {
                await Promise.allSettled(requests)
            }
        }
    }
}
