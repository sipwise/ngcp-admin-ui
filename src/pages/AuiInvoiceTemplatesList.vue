<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="invoicetemplates"
            row-key="id"
            resource="invoicetemplates"
            resource-path="templates/invoices"
            :use-api-v2="true"
            resource-type="api"
            :resource-singular="t('Invoice Templates')"
            :title="t('Invoice Templates')"
            :columns="columns"
            :searchable="true"
            :clear-filter-on-change="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'invoiceTemplateCreation'}
            ]"
            :deletable="true"
            :row-actions="rowActions"
            deletion-subject="id"
            :show-header="false"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: t('Name'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'id',
                    label: t('ID'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: 'category',
                    label: t('Category'),
                    component: 'select',
                    options: categoryOptions,
                    wildcard: false
                },
                {
                    criteria: 'call_direction',
                    label: t('Call Direction'),
                    component: 'select',
                    options: callDirectionOptions,
                    wildcard: false
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import {
    getInvoiceTemplateCallDirectionOptions,
    getInvoiceTemplateCategoryOptions
} from 'src/helpers/invoice-templates'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiInvoiceTemplatesList' })

const { t } = useI18n()

const dataTable = ref(null)

const categoryOptions = computed(() => getInvoiceTemplateCategoryOptions())
const callDirectionOptions = computed(() => getInvoiceTemplateCallDirectionOptions())

const columns = computed(() => [
    {
        name: 'id',
        label: t('ID'),
        field: 'id',
        sortable: true,
        align: 'left'
    },
    {
        name: 'reseller_id',
        label: t('Reseller'),
        field: 'reseller_id_expand.name',
        expand: 'reseller_id',
        sortable: true,
        align: 'left',
        editable: (val) => {
            return !(val.row.reseller_id === null)
        },
        component: 'select-lazy',
        componentIcon: 'fas fa-users',
        componentField: 'reseller_id',
        componentOptionsGetter: 'resellers/filteredResellerOptions',
        componentOptionsAction: 'resellers/filterResellers'
    },
    {
        name: 'name',
        label: t('Name'),
        field: 'name',
        sortable: true,
        editable: true,
        component: 'input',
        align: 'left'
    },
    {
        name: 'type',
        label: t('Type'),
        field: 'type',
        sortable: true,
        align: 'left'
    },
    {
        name: 'category',
        label: t('Category'),
        field: 'category',
        sortable: true,
        align: 'left'
    },
    {
        name: 'call_direction',
        label: t('Call Direction'),
        field: 'call_direction',
        sortable: true,
        editable: true,
        component: 'select',
        componentOptions: callDirectionOptions.value,
        align: 'left'
    }
])

function rowActions () {
    return [
        'invoiceTemplateEditContent',
        'invoiceTemplateEdit'
    ]
}

async function refresh () {
    await dataTable.value?.refresh({ force: true })
}
</script>
