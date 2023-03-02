<template>
    <aui-data-context
        resource-object-id="peeringGroupDetailsServerContext"
        resource="peeringservers"
        :resource-id="$route.params.serverId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
