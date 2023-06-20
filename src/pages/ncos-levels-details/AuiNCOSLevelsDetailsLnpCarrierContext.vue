<template>
    <aui-data-context
        resource-object-id="ncosLevelsDetailsLnpCarrierContext"
        resource="ncoslnpcarriers"
        :resource-id="ncoslevelCarrierContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import ncoslevelCarrierMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier'
export default {
    components: { AuiDataContext },
    mixins: [
        ncoslevelCarrierMixin
    ]
}
</script>
