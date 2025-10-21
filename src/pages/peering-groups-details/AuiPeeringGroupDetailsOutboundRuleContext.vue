<template>
    <aui-data-context
        resource-object-id="peeringGroupDetailsOutboundRuleContext"
        :resource="`v2/peerings/groups/${$route.params.id}/rules`"
        :resource-id="$route.params.outboundrulesId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
