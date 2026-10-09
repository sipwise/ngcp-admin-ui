<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="contacts"
            row-key="id"
            resource="customercontacts"
            resource-type="api"
            :use-api-v2="true"
            :resource-path="isReseller ? 'customercontacts' : 'contacts'"
            :resource-default-filters="{ status: 'active' }"
            :resource-singular="t('Contact')"
            :row-resource="(row) => `v2/${contactResource(row)}`"
            :title="t('Contacts')"
            :columns="columns"
            :searchable="true"
            resource-search-field="email"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                { criteria: 'email', label: t('Email'), component: 'input' },
                { criteria: 'firstname', label: t('First Name'), component: 'input' },
                { criteria: 'lastname', label: t('Last Name'), component: 'input' },
                { criteria: 'company', label: t('Company'), component: 'input' },
                ...(!isReseller ? [{ criteria: 'reseller_id', label: t('Reseller ID'), component: 'input', wildcard: false }] : []),
                { criteria: 'id', label: t('ID'), component: 'input', wildcard: false }
            ]"
            :editable="true"
            :addable="true"
            :add-action-routes="addActionRoutes"
            :deletable="true"
            :row-actions="() => ['contactEdit', 'contactJournal']"
            :row-menu-route-intercept="rowActionRouteIntercept"
            deletion-subject="email"
            :deletion-text="'You are about to delete {resource} {subject}'"
            :show-header="false"
        />
    </aui-base-list-page>
</template>

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import { aclCanResource } from 'src/acl'
import { useUser } from 'src/composables/useUser'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiContactList' })

const { t } = useI18n()
const { isReseller } = useUser()
const dataTable = ref(null)

const columns = computed(() => [
    {
        name: 'id',
        label: t('ID'),
        field: 'id',
        sortable: true,
        align: 'left'
    },
    {
        name: 'reseller_name',
        label: t('Reseller'),
        field: 'reseller_id_expand.name',
        expand: 'reseller_id',
        sortable: false,
        editable: ({ row }) => !!row.reseller_id,
        component: 'select-lazy',
        componentIcon: 'fas fa-user-tie',
        componentField: 'reseller_id',
        componentOptionsGetter: 'resellers/filteredResellerOptions',
        componentOptionsAction: 'resellers/filterResellers',
        align: 'left'
    },
    {
        name: 'firstname',
        label: t('First Name'),
        field: 'firstname',
        sortable: true,
        editable: true,
        component: 'input',
        align: 'left'
    },
    {
        name: 'lastname',
        label: t('Last Name'),
        field: 'lastname',
        sortable: true,
        editable: true,
        component: 'input',
        align: 'left'
    },
    {
        name: 'company',
        label: t('Company'),
        field: 'company',
        sortable: true,
        editable: true,
        component: 'input',
        align: 'left'
    },
    {
        name: 'email',
        label: t('Email'),
        field: 'email',
        sortable: true,
        editable: true,
        component: 'input',
        align: 'left'
    }
].filter((column) => !isReseller.value || column.name !== 'reseller_name'))

const addActionRoutes = computed(() => {
    const routes = [{ name: 'contactCreateCustomer' }]
    if (aclCanResource('create', 'systemcontacts')) {
        routes.push({ name: 'contactCreateSystem' })
    }
    return routes
})

function contactResource (row) {
    return isReseller.value || row.reseller_id ? 'customercontacts' : 'systemcontacts'
}

function rowActionRouteIntercept ({ route, row }) {
    if (row) {
        route.query = { ...route.query, resource: contactResource(row) }
    }
    return route
}

async function refresh () {
    await dataTable.value?.refresh({ force: true })
}
</script>
