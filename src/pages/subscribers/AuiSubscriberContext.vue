<template>
    <aui-base-page
        @refresh="refresh"
    >
        <router-view
            :key="route.params.id"
        />
    </aui-base-page>
</template>
<script setup>
import AuiBasePage from 'pages/AuiBasePage'
import { useSubscriberContext } from 'src/composables/useSubscriberContext'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiSubscriberContext' })

const route = useRoute()

const { reload } = useSubscriberContext({
    resourceId: () => route.params.id
})

function refresh () {
    return reload()
}
</script>
