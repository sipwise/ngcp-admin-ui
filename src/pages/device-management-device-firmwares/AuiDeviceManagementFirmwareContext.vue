<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="deviceManagementFirmwareContext"
            :resource-id="deviceManagementContextResourceId"
            :resource="deviceManagementFirmwareContextResource"
            :resource-expand="deviceManagementContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'

export default {
    name: 'AuiDeviceManagementFirmwareContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        deviceManagementContextMixin
    ]
}
</script>
