<template>
    <div>
        <div>
            <pre>{{ deviceConfig }}</pre>
        </div>
    </div>
</template>

<script>
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
import { getDeviceConfigContent } from 'src/store/deviceManagement/actions'
export default {
    name: 'AuiCustomerDetailsPbxDeviceConfig',
    mixins: [
        deviceManagementContextMixin
    ],
    data () {
        return {
            deviceConfig: null
        }
    },
    watch: {
        customerPbxDeviceContextConfigId: {
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
