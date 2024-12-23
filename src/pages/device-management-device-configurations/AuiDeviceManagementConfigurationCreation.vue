<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-device-management-configuration
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
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
            </aui-new-device-management-configuration>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewDeviceManagementConfiguration from 'components/edit-forms/AuiNewDeviceManagementConfiguration'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDeviceManagementConfigurationCreation',
    components: {
        AuiNewDeviceManagementConfiguration,
        AuiBaseAddPage,
        AuiFormActionsCreation
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            createDeviceConfiguration: WAIT_PAGE
        }),
        async create (data) {
            await this.createDeviceConfiguration(data)
            showGlobalSuccessMessage(this.$t('Device configuration created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
