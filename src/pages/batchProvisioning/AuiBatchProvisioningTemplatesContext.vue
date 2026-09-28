<template>
    <aui-base-page
        @refresh="refresh"
    >
        <router-view />
    </aui-base-page>
</template>

<script setup>
import AuiBasePage from 'pages/AuiBasePage'
import { useBatchProvisioningTemplateContext } from 'src/composables/useBatchProvisioningTemplateContext'
import { decodeHex } from 'src/helpers/hex'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiBatchProvisioningTemplatesContext' })

const route = useRoute()

const { reload } = useBatchProvisioningTemplateContext({
    resourceId: () => decodeHex(route.params.id)
})

function refresh () {
    return reload()
}
</script>
