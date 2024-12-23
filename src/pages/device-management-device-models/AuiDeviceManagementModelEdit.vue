<template>
    <aui-base-edit-context>
        <aui-new-device-management-model
            v-if="deviceManagementModelContext && deviceModelImages"
            :initial-form-data="deviceManagementModelContext"
            :images="deviceModelImages"
            :reseller="deviceManagementModelContextReseller"
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
        </aui-new-device-management-model>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewDeviceManagementModel from 'components/edit-forms/AuiNewDeviceManagementModel'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiDeviceManagementModelEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewDeviceManagementModel
    },
    mixins: [
        deviceManagementContextMixin
    ],
    computed: {
        ...mapState('deviceManagement', [
            'deviceModelImages'
        ])
    },
    async mounted () {
        if (this.deviceManagementContextResourceId) {
            await this.fetchDeviceModel({
                id: this.deviceManagementContextResourceId
            })
        }
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            updateDeviceModel: WAIT_PAGE,
            fetchDeviceModel: WAIT_PAGE
        }),
        async update (data) {
            await this.updateDeviceModel({
                id: this.deviceManagementContextResourceId,
                data
            })
            await this.fetchDeviceModel({
                id: this.deviceManagementContextResourceId,
                header: {
                    'Cache-Control': 'no-cache'
                }
            })
            await this.reloadDeviceManagementModelContext()
            showGlobalSuccessMessage(this.$t('Device model updated successfully'))
        }
    }
}
</script>
