<template>
    <aui-base-edit-context>
        <aui-new-pbx-group
            v-if="customerContext && customerPbxGroupContext"
            :initial-form-data="customerPbxGroupContext"
            :customer-id="customerContext.id"
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
import AuiNewPbxGroup from 'components/edit-forms/AuiNewPbxGroup'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import customerPbxGroupContextMixin from 'src/mixins/data-context-pages/customer-details-pbx-group'
import subscriberCommonMixin from 'src/mixins/data-context-pages/subscriber-common'
export default {
    name: 'AuiCustomerDetailsPbxGroupsEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewPbxGroup
    },
    mixins: [
        customerContextMixin,
        customerPbxGroupContextMixin,
        subscriberCommonMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            updateSubscriber: WAIT_PAGE
        }),
        async update (data, { seatAliasNumbers, seatUnassignedAliasNumbers }) {
            try {
                await this.updateSubscriber(data)
                await this.subscriberCommonAssignNumbers({
                    subscriberId: this.customerPbxGroupContext.id,
                    customerId: this.customerContext.id,
                    assignedNumberIds: seatAliasNumbers,
                    unassignedNumberIds: seatUnassignedAliasNumbers
                })
                showGlobalSuccessMessage(this.$t('Group successfully updated'))
            } finally {
                await this.reloadCustomerPbxGroupContext()
            }
        }
    }
}
</script>
