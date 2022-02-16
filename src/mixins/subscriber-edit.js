import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'

import subContext from 'src/mixins/sub-context'
export default {
    mixins: [
        subContext
    ],
    data: {
        subscribers: null
    },
    computed: {
        subscriber () {},
        customer () {},
        customerId () {
            return this.customer?.id
        },
        isPbxAccount () {
            return this.customer?.type === 'pbxaccount'
        },
        isPbxPilot () {
            const isSubscriberPbxPilot = this.subscriber && this.subscriber.is_pbx_pilot === true
            const isNewSubscriberPbxPilot = !this.subscribers ||
                (this.subscribers && this.subscribers.length && this.subscribers.length === 0)
            return this.isPbxAccount && (isSubscriberPbxPilot || isNewSubscriberPbxPilot)
        },
        isPbxSeat () {
            const isSubscriberPbxSeat = this.subscriber && !this.subscriber.is_pbx_pilot && !this.subscriber.is_pbx_group
            const isNewSubscriberPbxSeat = this.subscribers && this.subscribers.length && this.subscribers.length > 0
            return this.isPbxAccount && (isSubscriberPbxSeat || isNewSubscriberPbxSeat)
        }
    },
    watch: {
        customerId: {
            async handler (customerId) {
                if (customerId) {
                    this.subscribers = this.fetchCustomerSubscribers(customerId)
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            fetchCustomerSubscribers: WAIT_PAGE
        }),
        async assignNumbersToSubscriber ({ subscriberId, aliasNumbers }) {
            const numberRequests = []
            aliasNumbers.forEach((number) => {
                numberRequests.push(this.assignNumberToSubscriber({
                    numberId: number.id,
                    subscriberId: subscriberId
                }))
            })
            if (numberRequests.length > 0) {
                await Promise.allSettled(numberRequests)
            }
        }
    }
}
