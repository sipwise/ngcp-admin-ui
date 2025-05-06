<template>
    <aui-base-edit-context>
        <aui-new-pbx-device
            v-if="customerContext && customerPbxDeviceContext"
            :initial-form-data="customerPbxDeviceContext"
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
        </aui-new-pbx-device>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewPbxDevice from 'components/edit-forms/AuiNewPbxDevice'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import customerPbxDeviceContextMixin from 'src/mixins/data-context-pages/device-management'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsPbxDeviceEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewPbxDevice
    },
    mixins: [
        customerContextMixin,
        customerPbxDeviceContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            updatePbxDevice: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updatePbxDevice(data)
                showGlobalSuccessMessage(this.$t('PBX Device successfully updated'))
            } finally {
                await this.reloadPbxCustomerDeviceContext()
            }
        }
    }
}
</script>
