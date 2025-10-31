<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="lnpCarrierContext"
            resource="lnpcarriers"
            :resource-id="lnpCarrierContextResourceId"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
export default {
    name: 'AuiLnpCarrierContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        lnpCarrierContextMixin
    ]
}
</script>
