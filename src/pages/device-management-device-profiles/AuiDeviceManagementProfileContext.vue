<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="deviceManagementProfileContext"
            :resource-id="deviceManagementContextResourceId"
            :resource="deviceManagementProfileContextResource"
            :resource-expand="deviceManagementProfileContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'

export default {
    name: 'AuiDeviceManagementProfileContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        deviceManagementContextMixin
    ]
}
</script>
