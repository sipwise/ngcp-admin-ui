<template>
    <aui-data-context
        resource-object-id="peeringGroupDetailsServerContext"
        :resource="`v2/peerings/groups/${$route.params.id}/servers`"
        :resource-id="$route.params.serverId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
