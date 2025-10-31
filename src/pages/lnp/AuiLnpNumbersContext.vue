<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="lnpNumbersContext"
            resource="lnpnumbers"
            :resource-id="lnpNumbersContextId"
        />
    </aui-base-page>
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import lnpNumbersContextMixin from 'src/mixins/data-context-pages/lnp-numbers'
export default {
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        lnpNumbersContextMixin
    ]
}
</script>
