<template>
    <aui-data-context
        resource-object-id="billingFeeContext"
        resource="billingfees"
        :resource-id="billingFeeContextId"
        :resource-expand="billingFeeContextExpand"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import billingFeeContextMixin from 'src/mixins/data-context-pages/billing-fees'
export default {
    components: { AuiDataContext },
    mixins: [
        billingFeeContextMixin
    ]
}
</script>
