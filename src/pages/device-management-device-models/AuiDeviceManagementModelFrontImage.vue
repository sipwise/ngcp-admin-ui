<template>
    <div class="fixed-center text-center">
        <img
            :src="imageSrc"
            alt="Device Model Image"
        >
    </div>
</template>

<script>
import { getDeviceModelImage } from 'src/store/deviceManagement/actions'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'
import { showGlobalErrorMessage } from 'src/helpers/ui'
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
