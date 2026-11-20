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
            :resource-alt="canReadSystemContacts ? 'contact/ajax' : 'contact/ajax_reseller'"
            :resource-singular="$t('Contact')"
            :row-resource="contactResource"
            :title="$t('Contacts')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="addActionRoutes"
            :deletable="true"
            :row-deletable="(row) => {
                return row.deletable === 1
            }"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            deletion-subject="email"
            :deletion-text="'You are about to delete {resource} {subject}'"
            :show-header="false"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
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
        ...mapGetters('user', ['isCustomerCare']),
        canReadSystemContacts () {
            return this.$aclResource('read', 'systemcontacts')
        },
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
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
            ].filter((column) => !this.isCustomerCare || column.name !== 'reseller_name')
        },
        addActionRoutes () {
            const addActionRoutes = [
                { name: 'contactCreateCustomer' }
            ]
            if (this.$aclResource('create', 'systemcontacts')) {
                addActionRoutes.push({ name: 'contactCreateSystem' })
            }
            return addActionRoutes
        }
    },
    methods: {
        contactResource (row) {
            if (!this.canReadSystemContacts || row.reseller_id || !!row.reseller_name) {
                return 'customercontacts'
            }
            return 'systemcontacts'
        },
        rowActionRouteIntercept ({ route, row }) {
            if (!route.query) {
                route.query = {}
            }
            if (row) {
                route.query.resource = this.contactResource(row)
            }
            return route
        },
        rowActions () {
            return [
                'contactEdit',
                'contactJournal'
            ]
        }
    }
}
</script>
