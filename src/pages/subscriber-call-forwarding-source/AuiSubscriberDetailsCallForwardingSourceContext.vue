<template>
    <aui-data-context
        resource-object-id="subscriberDetailsCallForwardingSourceSetContext"
        resource="cfsourcesets"
        :resource-id="$route.params.sourcesetId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
