<template>
    <aui-base-page>
        <router-view
            :key="route.params.id"
        />
    </aui-base-page>
</template>

<script setup>
import AuiBasePage from 'pages/AuiBasePage'
import { useDataContext } from 'src/composables/useDataContext'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiSoundSetsContext' })

const route = useRoute()

useDataContext({
    resourceObjectId: 'soundSetsContext',
    resource: 'soundsets',
    resourceId: () => route.params.id,
    resourceExpand: ['reseller_id', 'customer_id', 'customer_id.contact_id']
})
</script>
