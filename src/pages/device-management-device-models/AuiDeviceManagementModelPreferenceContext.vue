<template>
    <aui-data-context
        resource-object-id="customerPreferenceContext"
        :resource-id="deviceManagementPreferenceContextResourceId"
        :resource="deviceManagementModelPreferenceContextResource"
    />
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import deviceManagementContextMixin from 'src/mixins/data-context-pages/device-management'

export default {
    name: 'AuideviceManagementModelPreferenceContext',
    components: {
        AuiDataContext
    },
    mixins: [
        deviceManagementContextMixin
    ]
}
</script>
