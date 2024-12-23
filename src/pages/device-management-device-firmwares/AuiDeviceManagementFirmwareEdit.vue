<template>
    <aui-base-edit-context>
        <aui-new-device-management-firmware
            v-if="deviceManagementFirmwareContext"
            :data-file="dataFile"
            :initial-form-data="deviceManagementFirmwareContext"
            :device="deviceManagementFirmwareContextDevice"
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
        </aui-new-device-management-firmware>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewDeviceManagementFirmware from 'components/edit-forms/AuiNewDeviceManagementFirmware'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDeviceManagementFirmwareEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewDeviceManagementFirmware
    },
    mixins: [
        deviceManagementContextMixin
    ],
    data () {
        return {
            dataFile: null
        }
    },
    async mounted () {
        if (this.deviceManagementContextResourceId) {
            this.dataFile = await this.getFirmwareFile(this.deviceManagementContextResourceId)
        }
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            updateDeviceFirmware: WAIT_PAGE,
            getFirmwareFile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateDeviceFirmware({
                id: this.deviceManagementContextResourceId,
                data
            })
            await this.reloadDeviceManagementFirmwareContext()
            showGlobalSuccessMessage(this.$t('Device firmware updated successfully '))
        }
    }
}
</script>
