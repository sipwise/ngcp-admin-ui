<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="deviceManagementModelContext"
            :resource-id="deviceManagementContextResourceId"
            :resource="deviceManagementModelContextResource"
            :resource-expand="deviceManagementModelContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'

export default {
    name: 'AuideviceManagementModelContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        deviceManagementContextMixin
    ]
}
</script>
