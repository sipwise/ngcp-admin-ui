<template>
    <aui-base-sub-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-subscriber
                v-if="customerId && subscribers"
                :initial-form-data="initialFormData"
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
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiSubscriberCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewSubscriber
    },
    mixins: [
        customerContextMixin
    ],
    data () {
        return {
            subscribers: null,
            isSeat: null,
            isPilot: null,
            pilotPrimaryNumber: null
        }
    },
    computed: {
        customerId () {
            return this.customerContext?.id
        },
        resellerId () {
            return this.customerContextReseller?.id
        },
        isPbxAccount () {
            return this.customerContextIsPbx
        }
    },
    watch: {
        subscribers () {
            this.isPilot = this.isPbxAccount && this.subscribers?.totalItems === 0
            this.isSeat = this.isPbxAccount && this.subscribers?.totalItems > 0
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
            const subscriberId = await this.createSubscriber(data)
            const numberRequests = []
            if (!data.is_pbx_pilot && !_.isEmpty(data.alias_numbers)) {
                data.alias_numbers.forEach((number) => {
                    numberRequests.push(this.assignNumberToSubscriber({
                        numberId: number.number_id,
                        subscriberId: subscriberId
                    }))
                })
                delete data.alias_numbers
            }
            if (numberRequests.length > 0) {
                await Promise.allSettled(numberRequests)
            }
            await this.$auiGoToPrevForm()
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
