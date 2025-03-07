<template>
    <aui-base-edit-context>
        <aui-new-subscriber
            v-if="subscriberContext && !subscriberContextIsPbxGroup"
            :initial-form-data="subscriberContext"
            :loading="$waitPage($wait)"
            :reseller-id="subscriberContextReseller?.id"
            :customer-id="subscriberContextCustomer.id"
            :domain="subscriberContextDomain"
            :is-pbx-account="subscriberContextCustomerIsPbx"
            :is-seat="subscriberContextIsPbxSeat"
            :is-pilot="subscriberContextIsPbxPilot"
            :pbx-groups="subscriberContextPbxGroups"
            :pbx-group-members="subscriberContextPbxGroupMembers"
            :profile="subscriberContextProfile"
            :profile-set="subscriberContextProfileSet"
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
        <aui-new-pbx-group
            v-else-if="subscriberContext"
            :initial-form-data="subscriberContext"
            :customer-id="subscriberContextCustomer.id"
            :loading="$waitPage($wait)"
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
        </aui-new-pbx-group>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewPbxGroup from 'components/edit-forms/AuiNewPbxGroup'
import AuiNewSubscriber from 'components/edit-forms/AuiNewSubscriber'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsMasterDataEdit',
    components: {
        AuiNewPbxGroup,
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriber
    },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            updateSubscriber: WAIT_PAGE,
            updatePbxGroups: WAIT_PAGE
        }),
        async update (data, { seatAliasNumbers, seatUnassignedAliasNumbers }) {
            if (this.subscriberContextIsPbxGroup) {
                await this.updatePbxGroups(data)
            } else {
                await this.updateSubscriber(data)
            }
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
