<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="contacts"
            row-key="id"
            resource="customercontacts"
            resource-type="ajax"
            resource-alt="contact/ajax"
            :resource-singular="$t('Contact')"
            :row-resource="(row) => {
                if (row.reseller_id || !!row.reseller_name) {
                    return 'customercontacts'
                } else {
                    return 'systemcontacts'
                }
            }"
            :title="$t('Contacts')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'contactCreateCustomer'},
                { name: 'contactCreateSystem'}
            ]"
            :deletable="true"
            :row-deletable="(row) => {
                return row.deletable === 1
            }"
            :row-menu-route-names="rowActionRouteNames"
            :row-menu-route-intercept="rowActionRouteIntercept"
            deletion-subject="email"
            :deletion-text="$t('You are about to delete {resource} {subject}')"
            :show-header="false"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiContactList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    data () {
        return {
        }
    },
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'left',
                    formatter: ({ row }) => {
                        return '#' + row.id
                    }
                },
                {
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_name',
                    sortable: true,
                    editable: (row) => {
                        return row.reseller_id || !!row.reseller_name
                    },
                    component: 'select-lazy',
                    componentIcon: 'fas fa-user-tie',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers',
                    align: 'left'
                },
                {
                    name: 'firstname',
                    label: this.$t('First Name'),
                    field: 'firstname',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'lastname',
                    label: this.$t('Last Name'),
                    field: 'lastname',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'company',
                    label: this.$t('Company'),
                    field: 'company',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'email',
                    label: this.$t('Email'),
                    field: 'email',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'contactEdit',
                'contactJournal'
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (!route.query) {
                route.query = {}
            }
            if (row && (row.reseller_id || !!row.reseller_name)) {
                route.query.resource = 'customercontacts'
            } else if (row) {
                route.query.resource = 'systemcontacts'
            }
            return route
        }
    }
}
</script>
