import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'

export default {
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
