<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            :resource-object-id="customerContextId"
            :resource="customerContextResource"
            :resource-id="customerContextResourceId"
            :resource-expand="customerContextExpand"
            :resource-relations="customerContextRelations"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        customerContextMixin
    ],
    methods: {
        async refresh () {
            await this.reloadCustomerContext()
        }
    }
}
</script>
