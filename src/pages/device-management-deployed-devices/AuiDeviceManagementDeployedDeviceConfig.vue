<template>
    <div>
        <div>
            <pre>{{ deviceConfig }}</pre>
        </div>
    </div>
</template>

<script>
import { getDeviceConfigContent } from 'src/store/deviceManagement/actions'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
export default {
    name: 'AuiDeviceManagementDeployedDeviceConfig',
    mixins: [
        deviceManagementContextMixin
    ],
    data () {
        return {
            deviceConfig: null
        }
    },
    watch: {
        deviceManagementDeployeDeviceContextDeviceConfigId: {
            handler: async function (newVal) {
                if (newVal) {
                    this.deviceConfig = await getDeviceConfigContent({ id: newVal })
                }
            },
            immediate: true
        }
    }
}
</script>
