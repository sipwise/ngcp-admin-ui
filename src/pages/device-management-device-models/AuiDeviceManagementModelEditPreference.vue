<template>
    <aui-base-sub-context>
        <template
            #default="{loading }"
        >
            <aui-new-customer-preference
                v-if="deviceManagementModelContext && deviceManagementModelPreferenceContext"
                :initial-form-data="deviceManagementModelPreferenceContext"
                :loading="loading"
                :label="$t('Edit custom preference')"
                @submit="update"
            >
                <template
                    #actions="{ hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-customer-preference>
        </template>
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiNewCustomerPreference from 'components/edit-forms/AuiNewCustomerPreference'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
export default {
    name: 'AuiDeviceManagementModelEditPreference',
    components: {
        AuiNewCustomerPreference,
        AuiFormActionsCreation,
        AuiBaseSubContext
    },
    mixins: [
        deviceManagementContextMixin
    ],
    methods: {
        ...mapWaitingActions('deviceManagement', {
            editCustomerPreference: WAIT_PAGE
        }),
        async update (data) {
            await this.editCustomerPreference({
                id: this.deviceManagementPreferenceContextResourceId,
                payload: data
            })
            await this.reloadDeviceManagementModelPreferenceContext()
            showGlobalSuccessMessage(this.$t('Custom preference updated successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
