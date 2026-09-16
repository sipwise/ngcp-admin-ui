<template>
    <router-view />
</template>
<script setup>
import { useDataContext } from 'src/composables/useDataContext'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiNCOSLevelsDetailsLnpCarrierContext' })

const route = useRoute()

useDataContext({
    resourceObjectId: 'ncosLevelsDetailsLnpCarrierContext',
    resource: 'ncoslnpcarriers',
    resourceId: () => route.params.lnpCarrierId
})
</script>
