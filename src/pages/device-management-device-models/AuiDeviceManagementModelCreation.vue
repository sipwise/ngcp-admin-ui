<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-device-management-model
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
            </aui-new-device-management-model>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewDeviceManagementModel from 'components/edit-forms/AuiNewDeviceManagementModel'
export default {
    name: 'AuiDeviceManagementModelCreation',
    components: {
        AuiNewDeviceManagementModel,
        AuiBaseAddPage,
        AuiFormActionsCreation
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            createDeviceModel: WAIT_PAGE
        }),
        async create (data) {
            await this.createDeviceModel(data)
            showGlobalSuccessMessage(this.$t('Device model created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
