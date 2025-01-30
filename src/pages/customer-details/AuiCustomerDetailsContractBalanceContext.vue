<template>
    <aui-data-context
        v-if="customerContext"
        resource-object-id="customerDetailsContractBalanceContext"
        resource="customerbalances"
        :resource-id="$route.params.id"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    components: { AuiDataContext },
    mixins: [
        customerContextMixin
    ]
}
</script>
