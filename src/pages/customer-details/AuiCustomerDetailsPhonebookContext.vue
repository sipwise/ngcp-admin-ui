<template>
    <aui-data-context
        resource-object-id="customerDetailsPhonebookContext"
        resource="customerphonebookentries"
        :resource-id="$route.params.phonebookId"
        :resource-filters="{
            customer_id: $route.params.id
        }"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
