<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="invoicetemplates"
            row-key="id"
            resource="invoicetemplates"
            resource-path="templates/invoices"
            :use-api-v2="true"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-type="api"
            :resource-singular="t('Invoice Template')"
            title=""
            :columns="columns"
            :searchable="true"
            :clear-filter-on-change="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsInvoiceTemplateCreation' }]"
            :deletable="true"
            deletion-subject="name"
            :show-header="false"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'id',
                    label: $t('ID'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: 'category',
                    label: $t('Category'),
                    component: 'select',
                    options: categoryOptions,
                    wildcard: false
                },
                {
                    criteria: 'call_direction',
                    label: $t('Call Direction'),
                    component: 'select',
                    options: callDirectionOptions,
                    wildcard: false
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { useSubContext } from 'src/composables/useSubContext'
import {
    getInvoiceTemplateCallDirectionOptions,
    getInvoiceTemplateCategoryOptions
} from 'src/helpers/invoice-templates'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiResellerDetailsInvoiceTemplates' })

const { t } = useI18n()
const { resourceObject } = useSubContext()

const categoryOptions = computed(() => getInvoiceTemplateCategoryOptions())
const callDirectionOptions = computed(() => getInvoiceTemplateCallDirectionOptions())

const columns = computed(() => [
    {
        name: 'id',
        label: t('ID'),
        field: 'id',
        sortable: true,
        align: 'center'
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
        'invoiceTemplateEdit',
        'invoiceTemplateEditContent'
    ]
}
</script>
