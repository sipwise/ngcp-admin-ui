<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-subscriber
                v-if="customerId && subscribers"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage()"
                :reseller-id="resellerId"
                :customer-id="customerId"
                :is-pbx-account="isPbxAccount"
                :is-seat="isSeat"
                :is-pilot="isPilot"
                :pilot-primary-number="pilotPrimaryNumber"
                @submit="create"
            >
                <template
                    #actions="{ loading, hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-subscriber>
        </template>
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import AuiNewSubscriber from 'components/edit-forms/AuiNewSubscriber'
import { WAIT_PAGE } from 'src/constants'
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiSubscriberCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
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
        async create (data) {
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
