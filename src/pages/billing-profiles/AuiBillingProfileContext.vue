<template>
    <aui-base-page>
        <aui-data-context
            :resource-object-id="billingProfileContextId"
            :resource="billingProfileContextResource"
            :resource-id="billingProfileContextResourceId"
            :resource-expand="billingProfileContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
export default {
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        billingProfileContextMixin
    ]
}
</script>
