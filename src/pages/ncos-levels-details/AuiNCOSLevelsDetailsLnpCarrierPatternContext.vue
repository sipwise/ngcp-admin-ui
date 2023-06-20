<template>
    <aui-data-context
        resource-object-id="ncosLevelsDetailsLnpCarrierPatternContext"
        resource="ncoslnppatterns"
        :resource-id="ncoslevelCarrierPatternContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import ncoslevelCarrierPatternMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier-pattern'
export default {
    components: { AuiDataContext },
    mixins: [
        ncoslevelCarrierPatternMixin
    ]
}
</script>
