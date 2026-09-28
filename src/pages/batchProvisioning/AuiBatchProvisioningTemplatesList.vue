<template>
    <div>
        <aui-data-table
            ref="dataTable"
            table-id="batchprovisioningtemplates"
            row-key="id"
            resource="provisioningtemplates"
            resource-type="api"
            :resource-singular="t('Template')"
            :title="t('Batch Provisioning')"
            :show-header="false"
            :resource-default-filters="resourceDefaultFilters"
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'batchProvisioningCreate' }]"
            :editable="true"
            :deletable="true"
            deletion-action="batchProvisioningTemplates/deleteTemplate"
            :row-deletable="(row) => !isStaticTemplate(row)"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
        />
    </div>
</template>

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import { useUser } from 'src/composables/useUser'
import { isStaticTemplate } from 'src/helpers/batch-provisioning'
import { encodeHex } from 'src/helpers/hex'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiBatchProvisioningTemplatesList' })

const props = defineProps({
    editable: {
        type: Number,
        default: null
    }
})

const { t } = useI18n()

const dataTable = ref(null)

function resourceDefaultFilters ({ operation } = {}) {
    if (operation !== 'get' || props.editable === undefined || props.editable === null) {
        return undefined
    }
    return { editable: props.editable }
}

watch(() => props.editable, () => {
    dataTable.value?.refresh({ page: 1, force: true })
})

const { isReseller } = useUser()

const LANG_LABELS = { js: 'JavaScript', perl: 'Perl' }

const columns = computed(() => [
    {
        name: 'id',
        label: t('ID'),
        field: 'id',
        align: 'left',
        formatter: ({ row }) => row.id ?? t('N/A')
    },
    {
        name: 'name',
        label: t('Name'),
        field: 'name',
        align: 'left'
    },
    ...(isReseller.value
        ? []
        : [{
            name: 'reseller_name',
            label: t('Reseller'),
            field: 'reseller_id_expand.name',
            expand: 'reseller_id',
            align: 'left'
        }]),
    {
        name: 'description',
        label: t('Description'),
        field: 'description',
        align: 'left'
    },
    {
        name: 'type',
        label: t('Type'),
        // name is used to avoid AuiDataTable showing N/A for
        // this made-up field. This field exist frontend only.
        field: 'name',
        align: 'left',
        formatter: ({ row }) => (isStaticTemplate(row) ? t('Static') : t('Database'))
    },
    {
        name: 'lang',
        label: t('Language'),
        field: 'lang',
        align: 'left',
        formatter: ({ row }) => formatLang(row.lang)
    }
])

function formatLang (lang) {
    return LANG_LABELS[lang] ? t(LANG_LABELS[lang]) : ''
}

function rowActions ({ row }) {
    const actions = ['batchProvisioningTemplatesForm', 'batchProvisioningTemplatesUpload']
    if (!isStaticTemplate(row)) {
        actions.push('batchProvisioningTemplatesEdit')
    }
    return actions
}

function rowActionRouteIntercept ({ route, row }) {
    if (row) {
        route.params.id = encodeHex(row.id)
    }
    return route
}

</script>
