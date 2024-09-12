<template>
    <aui-base-edit-context>
        <aui-new-device-management-configuration
            v-if="deviceManagementConfigurationContext && deviceConfigurationContent"
            :initial-form-data="deviceManagementConfigurationContext"
            :device="deviceManagementConfigurationContextDevice"
            :content="deviceConfigurationContent"
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
        </aui-new-device-management-configuration>
    </aui-base-edit-context>
</template>

<script>
import AuiNewDeviceManagementConfiguration from 'components/edit-forms/AuiNewDeviceManagementConfiguration'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { mapState } from 'vuex'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
export default {
    name: 'AuiDeviceManagementConfigurationEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewDeviceManagementConfiguration
    },
    mixins: [
        deviceManagementContextMixin
    ],
    computed: {
        ...mapState('deviceManagement', [
            'deviceConfigurationContent'
        ])
    },
    async mounted () {
        if (this.deviceManagementContextResourceId) {
            await this.getDeviceConfigfiles({
                id: this.deviceManagementContextResourceId
            })
        }
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            updateDeviceConfiguration: WAIT_PAGE,
            getDeviceConfigfiles: WAIT_PAGE
        }),
        async update (data) {
            await this.updateDeviceConfiguration({
                id: this.deviceManagementContextResourceId,
                data: data
            })
            await this.getDeviceConfigfiles({
                id: this.deviceManagementContextResourceId
            })
            await this.reloadDeviceManagementConfigurationContext()
            showGlobalSuccessMessage(this.$t('Device configuration updated successfully '))
        }
    }
}
</script>
