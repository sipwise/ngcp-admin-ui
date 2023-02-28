<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="peeringGroupContext"
            resource="peeringgroups"
            :resource-id="id"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiPeeringGroupContext',
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
