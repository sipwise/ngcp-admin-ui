<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="deviceManagementConfigurationContext"
            :resource-id="deviceManagementContextResourceId"
            :resource="deviceManagementConfigurationContextResource"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'

export default {
    name: 'AuiDeviceManagementConfigurationContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        deviceManagementContextMixin
    ]
}
</script>
