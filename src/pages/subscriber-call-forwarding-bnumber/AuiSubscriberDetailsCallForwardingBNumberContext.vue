<template>
    <aui-data-context
        resource-object-id="subscriberDetailsCallForwardingBNumberSetContext"
        resource="cfbnumbersets"
        :resource-id="$route.params.bnumbersetId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
