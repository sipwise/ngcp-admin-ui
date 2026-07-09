<template>
    <aui-data-context
        resource-object-id="customerDetailsLocationContext"
        resource="customerlocations"
        :resource-id="$route.params.locationId"
        :resource-filters="{
            contract_id: $route.params.id
        }"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
