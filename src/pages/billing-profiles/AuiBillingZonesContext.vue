<template>
    <aui-data-context
        resource-object-id="billingZoneContext"
        resource="billingzones"
        :resource-id="billingZoneContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import billingZoneContextMixin from 'src/mixins/data-context-pages/billing-zones'
export default {
    components: { AuiDataContext },
    mixins: [
        billingZoneContextMixin
    ]
}
</script>
