<template>
    <aui-base-page
        @refresh="refresh"
    >
        <router-view />
    </aui-base-page>
</template>

<script setup>
import AuiBasePage from 'pages/AuiBasePage'
import { useInvoiceTemplateContext } from 'src/composables/useInvoiceTemplateContext'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiInvoiceTemplatesContext' })

const route = useRoute()

const { reload } = useInvoiceTemplateContext({
    resourceId: () => route.params.id
})

function refresh () {
    return reload()
}
</script>
