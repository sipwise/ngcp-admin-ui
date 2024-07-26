<template>
    <aui-base-page>
        <aui-data-context
            :resource-object-id="billingVoucherContextId"
            resource="vouchers"
            :resource-id="billingVoucherContextResourceId"
            :resource-expand="billingVoucherContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import billingVoucherContextMixin from 'src/mixins/data-context-pages/billing-vouchers'
export default {
    name: 'AuiBillingVoucherContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        billingVoucherContextMixin
    ]
}
</script>
