<template>
    <aui-data-context
        resource-object-id="subscriberDetailsCallForwardingDestinationSetContext"
        resource="cfdestinationsets"
        :resource-id="$route.params.destinationsetId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    name: 'AuiSubscriberDetailsCallForwardingDestinationContext',
    components: { AuiDataContext }
}
</script>
