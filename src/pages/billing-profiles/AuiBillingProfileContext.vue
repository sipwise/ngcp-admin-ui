<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="billingProfileContext"
            resource="billingprofiles"
            :resource-id="billingProfileId"
        />
    </aui-base-page>
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    components: { AuiBasePage, AuiDataContext },
    props: {
        billingProfileId: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
