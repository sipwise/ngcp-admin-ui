<template>
    <aui-base-edit-context>
        <aui-new-pbx-group
            v-if="customerContext && customerPbxGroupContext"
            :initial-form-data="customerPbxGroupContext"
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
export default {
    name: 'AuiCustomerDetailsPbxGroupsEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewPbxGroup
    },
    mixins: [
        customerContextMixin,
        customerPbxGroupContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            updateSubscriber: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriber(data)
                showGlobalSuccessMessage(this.$t('Group successfully updated'))
            } finally {
                await this.reloadCustomerPbxGroupContext()
            }
        }
    }
}
</script>
