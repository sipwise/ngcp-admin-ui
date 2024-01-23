<template>
    <aui-base-edit-context>
        <aui-new-subscriber
            v-if="customerContext && customerContextSubscribers && customerSubscriberContext"
            :initial-form-data="customerSubscriberContext"
            :loading="$waitPage($wait)"
            :reseller-id="customerContextReseller?.id"
            :customer-id="customerContext.id"
            :domain="customerSubscriberContextDomain"
            :is-pbx-account="customerSubscriberContextCustomerIsPbx"
            :is-seat="customerSubscriberContextIsSeat"
            :is-pilot="customerSubscriberContextIsPilot"
            :pbx-groups="customerSubscriberContextPbxGroups"
            :profile="customerSubscriberContextProfile"
            :profile-set="customerSubscriberContextProfileSet"
            :is-edit-mode="true"
            layout="8-4"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-subscriber>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriber from 'components/edit-forms/AuiNewSubscriber'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import customerSubscriberContextMixin from 'src/mixins/data-context-pages/customer-details-subscriber'
export default {
    name: 'AuiSubscriberEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriber
    },
    mixins: [
        customerContextMixin,
        customerSubscriberContextMixin
    ],
    async mounted () {
        await Promise.all([
            this.fetchCustomerContextSubscribers(),
            this.loadCustomerSubscriberContext()
        ])
    },
    methods: {
        ...mapWaitingActions('customers', {
            updateSubscriber: WAIT_PAGE
        }),
        async update (data, { seatAliasNumbers, seatUnassignedAliasNumbers }) {
            await this.updateSubscriber(data)
            await this.subscriberCommonAssignNumbers({
                subscriberId: this.customerSubscriberContext.id,
                customerId: this.customerContext.id,
                assignedNumberIds: seatAliasNumbers,
                unassignedNumberIds: seatUnassignedAliasNumbers
            })
            await this.reloadCustomerSubscriberContext()
            showGlobalSuccessMessage(this.$t('Subscriber updated successfully'))
        }
    }
}
</script>
