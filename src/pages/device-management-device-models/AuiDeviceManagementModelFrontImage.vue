<template>
    <div class="fixed-center text-center">
        <img
            :src="imageSrc"
            alt="Device Model Image"
        >
    </div>
</template>

<script>
import { showGlobalErrorMessage } from 'src/helpers/ui'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
import { getDeviceModelImage } from 'src/store/deviceManagement/actions'
export default {
    name: 'AuiDeviceManagementModelFrontImage',
    mixins: [
        deviceManagementContextMixin
    ],
    data () {
        return {
            imageSrc: null
        }
    },
    async created () {
        try {
            this.imageSrc = await getDeviceModelImage({
                id: this.deviceManagementContextResourceId,
                header: {
                    'Cache-Control': 'no-cache'
                }
            })
        } catch (error) {
            showGlobalErrorMessage(error)
        }
    }
}
</script>
