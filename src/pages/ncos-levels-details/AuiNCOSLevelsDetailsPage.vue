<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="ncoslevelContext"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import ncosLevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
export default {
    name: 'AuiNCOSLevelsDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        ncosLevelContextMixin
    ]
}
</script>
