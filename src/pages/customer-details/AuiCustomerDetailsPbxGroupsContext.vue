<template>
    <aui-data-context
        resource-object-id="customerDetailsPbxGroupContext"
        resource="subscribers"
        :resource-id="$route.params.pbxGroup"
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
