<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="deviceManagementDeployedDeviceContext"
            :resource-id="deviceManagementContextResourceId"
            :resource="deviceManagementDeployedDeviceContextResource"
            :resource-expand="deviceManagementDeployedContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'

export default {
    name: 'AuiDeviceManagementDeployedDeviceContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        deviceManagementContextMixin
    ]
}
</script>
