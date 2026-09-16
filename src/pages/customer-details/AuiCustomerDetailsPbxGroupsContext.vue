<template>
    <router-view />
</template>
<script setup>
import { useDataContext } from 'src/composables/useDataContext'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiCustomerDetailsPbxGroupsContext' })

const route = useRoute()

useDataContext({
    resourceObjectId: 'customerDetailsPbxGroupContext',
    resource: 'subscribers',
    resourceId: () => route.params.pbxGroup,
    resourceFilters: () => ({ customer_id: route.params.id })
})
</script>
