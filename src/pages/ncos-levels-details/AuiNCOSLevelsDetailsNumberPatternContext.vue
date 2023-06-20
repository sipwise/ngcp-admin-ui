<template>
    <aui-data-context
        resource-object-id="ncosLevelsDetailsNumberPatternContext"
        resource="ncospatterns"
        :resource-id="ncoslevelPatternContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import ncoslevelPatternContextMixin from 'src/mixins/data-context-pages/ncoslevel-details-pattern'
export default {
    components: { AuiDataContext },
    mixins: [
        ncoslevelPatternContextMixin
    ]
}
</script>
