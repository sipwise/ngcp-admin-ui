<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="lnpCarrierContext"
            resource="lnpcarriers"
            :resource-id="id"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiLnpCarrierContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
