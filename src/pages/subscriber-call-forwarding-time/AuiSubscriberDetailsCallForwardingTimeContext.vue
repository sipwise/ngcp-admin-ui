<template>
    <aui-data-context
        resource-object-id="subscriberDetailsCallForwardingTimeSetContext"
        resource="cftimesets"
        :resource-id="$route.params.timesetId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
