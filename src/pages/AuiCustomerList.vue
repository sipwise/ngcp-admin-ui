<template>
    <aui-base-list-page
        acl-resource="entity.customers"
        :add-button-routes="[
            { name: 'customerCreation' }
        ]"
        :edit-button-split="true"
        :edit-button-route-names="editButtonRouteNames"
    >
        <aui-data-table
            ref="table"
            table-id="customers"
            row-key="id"
            resource="customers"
            resource-base-path="customer"
            resource-type="ajax"
            resource-alt="customer/ajax"
            resource-singular="customer"
            resource-plural="customers"
            :deletion-label="$t('Terminate')"
            :title="$t('Customers')"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="true"
            :show-header="false"
            deletion-subject="id"
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
        >
            <template
                v-slot:row-more-menu="props"
            >
                <template
                    v-for="(editButtonRouteName, index) in editButtonRouteNames"
                >
                    <aui-popup-menu-item
                        v-if="$routeMeta.$aclCan(routeByName(editButtonRouteName, props.row))"
                        :key="index"
                        color="primary"
                        :label="$routeMeta.$label(routeByName(editButtonRouteName, props.row))"
                        :icon="$routeMeta.$icon(routeByName(editButtonRouteName, props.row))"
                        :to="routeByName(editButtonRouteName, props.row)"
                    />
                </template>
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { mapGetters } from 'vuex'
import AuiBaseListPage from 'pages/AuiBaseListPage'
export default {
    name: 'AuiPageCustomers',
    components: {
        AuiBaseListPage,
        AuiPopupMenuItem,
        AuiDataTable
    },
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        editButtonRouteNames () {
            return [
                'customerEdit',
                'customerDetails',
                'customerPreferences'
            ]
        },
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'external_id',
                    label: this.$t('External #'),
                    field: 'external_id',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'contact_reseller_name',
                    label: this.$t('Reseller'),
                    field: 'contact_reseller_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'contact_email',
                    label: this.$t('Contact Email'),
                    field: 'contact_email',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select-lazy',
                    componentIcon: 'fas fa-envelope',
                    componentField: 'contact_id',
                    componentOptionsGetter: 'contracts/customerContactsAsOptions',
                    componentOptionsAction: 'contracts/fetchCustomerContacts'
                },
                {
                    name: 'contact_lastname',
                    label: this.$t('Name'),
                    field: 'contact_lastname',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'product_name',
                    label: this.$t('Product'),
                    field: 'product_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'billing_profile_name',
                    label: this.$t('Billing Profile'),
                    field: 'billing_profile_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.customerStatusOptions
                },
                {
                    name: 'max_subscribers',
                    label: this.$t('Max. Subscribers'),
                    field: 'max_subscribers',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        routeByName (name, row) {
            return { name: name, params: { id: row.id } }
        }
    }
}
</script>
