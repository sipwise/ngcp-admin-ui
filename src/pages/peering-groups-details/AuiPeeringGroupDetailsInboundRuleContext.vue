<template>
    <aui-data-context
        resource-object-id="peeringGroupDetailsInboundRuleContext"
        :resource="`v2/peerings/groups/${$route.params.id}/inbound-rules`"
        :resource-id="peeringInboundContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import peeringInboundContextMixin from 'src/mixins/data-context-pages/peering-details-inbound'
export default {
    components: { AuiDataContext },
    mixins: [
        peeringInboundContextMixin
    ]
}
</script>
