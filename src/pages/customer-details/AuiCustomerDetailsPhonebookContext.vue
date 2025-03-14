<template>
    <aui-data-context
        resource-object-id="customerDetailsPhonebookContext"
        :resource="`v2/customers/${customerContextResourceId}/phonebook`"
        :resource-id="$route.params.phonebookId"
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
