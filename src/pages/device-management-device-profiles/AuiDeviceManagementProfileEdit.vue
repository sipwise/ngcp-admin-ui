<template>
    <aui-base-edit-context>
        <aui-new-device-management-profile
            v-if="deviceManagementProfileContext"
            :initial-form-data="deviceManagementProfileContext"
            :device-config="deviceManagementProfileContextDeviceConfig"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-device-management-profile>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewDeviceManagementProfile from 'components/edit-forms/AuiNewDeviceManagementProfile'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDeviceManagementProfileEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewDeviceManagementProfile
    },
    mixins: [
        deviceManagementContextMixin
    ],
    methods: {
        ...mapWaitingActions('deviceManagement', {
            updateDeviceProfile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateDeviceProfile({
                id: this.deviceManagementContextResourceId,
                data
            })
            await this.reloadDeviceManagementProfileContext()
            showGlobalSuccessMessage(this.$t('Device profile updated successfully '))
        }
    }
}
</script>
