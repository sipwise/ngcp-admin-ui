<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="ncosSetsContext"
            resource="v2/ncos/sets"
            :resource-id="id"
            :resource-expand="[
                'reseller_id'
            ]"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiNCOSSetsContext',
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
