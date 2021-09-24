<template>
    <aui-base-add-page
        ref="addPage"
        @form-input="triggerCreation"
    >
        <aui-new-subscriber
            v-if="customerId && subscribers"
            :loading="$waitPage()"
            :reseller-id="resellerId"
            :customer-id="customerId"
            :is-pbx-account="isPbxAccount"
            :is-seat="isSeat"
            :is-pilot="isPilot"
            :pilot-primary-number="pilotPrimaryNumber"
        />
    </aui-base-add-page>
</template>
<script>
import _ from 'lodash'
import AuiNewSubscriber from 'components/edit-forms/AuiNewSubscriber'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiSubscriberCreation',
    components: {
        AuiBaseAddPage,
        AuiNewSubscriber
    },
    data () {
        return {
            subscribers: null,
            isSeat: null,
            isPilot: null,
            pilotPrimaryNumber: null
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        customerId () {
            return this.resourceObject?.id
        },
        resellerId () {
            // eslint-disable-next-line camelcase
            return this.resourceRelatedObjects?.contact?.reseller_id
        },
        isPbxAccount () {
            return this.resourceObject?.type === 'pbxaccount'
        }
    },
    watch: {
        subscribers () {
            this.isPilot = this.resourceObject?.type === 'pbxaccount' && this.subscribers?.totalItems === 0
            this.isSeat = this.resourceObject?.type === 'pbxaccount' && this.subscribers?.totalItems > 0
            if (this.isSeat && this.subscribers?.items) {
                this.pilotPrimaryNumber = this.subscribers.items.filter(subscriber => subscriber.is_pbx_pilot)[0].primary_number
            }
        },
        async customerId () {
            await this.updateSubscribers()
        }
    },
    async mounted () {
        await this.updateSubscribers()
    },
    methods: {
        ...mapWaitingActions('customers', {
            createSubscriber: WAIT_PAGE,
            fetchCustomerSubscribers: WAIT_PAGE,
            assignNumberToSubscriber: WAIT_PAGE
        }),
        async triggerCreation (data) {
            // TODO remove as soon as subscriber endpoint supports association of new seat and pilot alias_numbers
            let numbers
            if (!data.is_pbx_pilot && !_.isEmpty(data.alias_numbers)) {
                numbers = _.cloneDeep(data.alias_numbers)
                delete data.alias_numbers
            }
            const subscriberId = await this.createSubscriber(data)
            if (numbers) {
                const requests = []
                for (const number of numbers) {
                    requests.push(this.assignNumberToSubscriber({
                        numberId: number.number_id,
                        subscriberId: subscriberId
                    }))
                }
                // TODO address /numbers endpoint fix to backend; currently returns 500
                await Promise.all(requests).catch(e => console.log(e))
            }
            this.$goBack()
            showGlobalSuccessMessage(this.$t('Subscriber created successfully'))
        },
        async updateSubscribers () {
            if (this.customerId) {
                this.subscribers = await this.fetchCustomerSubscribers(this.customerId)
            }
        }
    }
}
</script>
