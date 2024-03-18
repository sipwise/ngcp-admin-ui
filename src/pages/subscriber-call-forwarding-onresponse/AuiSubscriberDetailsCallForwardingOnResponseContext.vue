<template>
    <aui-data-context
        resource-object-id="subscriberDetailsCallForwardingOnResponseContext"
        resource="cfmappings"
        :resource-id="$route.params.id"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
