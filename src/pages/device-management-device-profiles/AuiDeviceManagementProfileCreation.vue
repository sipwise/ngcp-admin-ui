<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-device-management-profile
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
            </aui-new-device-management-profile>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewDeviceManagementProfile from 'components/edit-forms/AuiNewDeviceManagementProfile'
export default {
    name: 'AuiDeviceManagementProfileCreation',
    components: {
        AuiNewDeviceManagementProfile,
        AuiBaseAddPage,
        AuiFormActionsCreation
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            createDeviceProfile: WAIT_PAGE
        }),
        async create (data) {
            await this.createDeviceProfile(data)
            showGlobalSuccessMessage(this.$t('Device profile created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
