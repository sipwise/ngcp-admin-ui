<template>
    <aui-data-context
        resource-object-id="lnpNumbersContext"
        resource="lnpnumbers"
        :resource-id="lnpCarrierNumbersContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import lnpNumbersContextMixin from 'src/mixins/data-context-pages/lnp-numbers'
export default {
    components: { AuiDataContext },
    mixins: [
        lnpNumbersContextMixin
    ]
}
</script>
