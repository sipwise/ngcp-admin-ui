<template>
    <aui-base-sub-context>
        <template
            #default="{loading }"
        >
            <aui-new-customer-preference
                v-if="deviceManagementModelContext"
                :loading="loading"
                :label="$t('Create custom preference')"
                @submit="create"
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
    name: 'AuiDeviceManagementModelCreationPreference',
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
            addNewPreference: WAIT_PAGE
        }),
        async create (data) {
            await this.addNewPreference({
                id: this.deviceManagementContextResourceId,
                payload: data
            })
            showGlobalSuccessMessage(this.$t('Custom preference created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
