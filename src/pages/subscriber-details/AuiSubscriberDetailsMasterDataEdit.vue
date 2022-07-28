<template>
    <aui-base-edit-context>
        <aui-new-subscriber
            v-if="subscriberContext && !subscriberContextIsPbxGroup"
            :initial-form-data="subscriberContext"
            :loading="$waitPage()"
            :reseller-id="subscriberContextReseller.id"
            :customer-id="subscriberContextCustomer.id"
            :domain="subscriberContextDomain"
            :is-pbx-account="subscriberContextCustomerIsPbx"
            :is-seat="subscriberContextIsPbxSeat"
            :is-pilot="subscriberContextIsPbxPilot"
            :pbx-groups="subscriberContextPbxGroups"
            :pbx-group-members="subscriberContextPbxGroupMembers"
            :profile="subscriberContextProfile"
            :profile-set="subscriberContextProfileSet"
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
        <aui-pbx-group-form
            v-else-if="subscriberContext"
            :initial-form-data="subscriberContext"
            :pbx-hunt-policy-options="subscriberCommonPbxHuntPolicyOptions"
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
        </aui-pbx-group-form>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriber from 'components/edit-forms/AuiNewSubscriber'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import AuiPbxGroupForm from 'components/edit-forms/AuiPbxGroupForm'
export default {
    name: 'AuiSubscriberDetailsMasterDataEdit',
    components: {
        AuiPbxGroupForm,
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriber
    },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            updateSubscriber: WAIT_PAGE
        }),
        async update (data, { seatAliasNumbers, seatUnassignedAliasNumbers }) {
            await this.updateSubscriber(data)
            await this.subscriberCommonAssignNumbers({
                subscriberId: this.subscriberContext.id,
                customerId: this.subscriberContextCustomer.id,
                assignedNumberIds: seatAliasNumbers,
                unassignedNumberIds: seatUnassignedAliasNumbers
            })
            await this.reloadSubscriberContext()
            showGlobalSuccessMessage(this.$t('Subscriber updated successfully'))
        }
    }
}
</script>
