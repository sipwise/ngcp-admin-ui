<template>
    <aui-base-page
        class="row no-wrap"
        :loading="loading"
    >
        <q-list
            class="col-auto q-pl-md q-pt-md"
        >
            <aui-main-menu-item
                v-for="(item, index) in menuItems"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
                :exact-active="item.exactActive"
            />
        </q-list>
        <aui-batch-provisioning-templates-list
            class="aui-batchprovisioningtemplates-list col overflow-auto"
            :editable="editable"
        />
    </aui-base-page>
</template>

<script setup>
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import AuiBasePage from 'pages/AuiBasePage'
import AuiBatchProvisioningTemplatesList from 'pages/batchProvisioning/AuiBatchProvisioningTemplatesList'
import { useWait } from 'src/composables/useWait'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiBatchProvisioningTemplatesPage' })

defineProps({
    editable: {
        type: Number,
        default: null
    }
})

const { t } = useI18n()
const { is } = useWait()

const loading = computed(() => is('aui-data-table-*').value)

const menuItems = computed(() => [
    {
        label: t('All'),
        icon: 'fas fa-list',
        to: { path: '/batchprovisioning' },
        exactActive: true
    },
    {
        label: t('Database'),
        icon: 'fas fa-database',
        to: { name: 'batchProvisioningListDatabase' }
    },
    {
        label: t('Static'),
        icon: 'fas fa-lock',
        to: { name: 'batchProvisioningListStatic' }
    }
])
</script>
<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'
.aui-batchprovisioningtemplates-list
    padding: $aui-page-padding
</style>
