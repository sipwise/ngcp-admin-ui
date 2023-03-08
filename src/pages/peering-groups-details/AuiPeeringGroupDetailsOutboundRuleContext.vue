<template>
    <aui-data-context
        resource-object-id="peeringGroupDetailsOutboundRuleContext"
        resource="peeringrules"
        :resource-id="$route.params.outboundrulesId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
