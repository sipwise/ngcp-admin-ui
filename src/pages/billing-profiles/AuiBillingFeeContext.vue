<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="billingFeeContext"
            resource="billingfees"
            :resource-id="billingFeeId"
        />
    </aui-base-page>
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    components: { AuiBasePage, AuiDataContext },
    props: {
        billingFeeId: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
