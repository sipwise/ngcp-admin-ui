<template>
    <aui-base-list-page
        acl-resource="entity.contracts"
        :add-button-split="false"
        :add-button-routes="[
            { name: 'contractCreatePeering'},
            { name: 'contractCreateReseller'}
        ]"
        :row-action-route-names="rowActionRouteNames"
        :delete-button-label="$t('Terminate')"
    >
        <aui-data-table
            ref="table"
            table-id="contracts"
            row-key="id"
            resource="contracts"
            resource-base-path="contract"
            resource-type="ajax"
            resource-alt="contract/ajax"
            :resource-singular="$t('Contract')"
            :deletion-label="$t('Terminate')"
            :title="$t('Contracts')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="true"
            deletion-subject="id"
            :deletion-title="$t('Terminate {resource}')"
            :deletion-text="$t('You are about to terminate {resource} {subject}')"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :show-header="false"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-list-page>
</template>

<script>
import AuiBaseListPage from 'pages/AuiBaseListPage'
import AuiDataTable from 'components/AuiDataTable'
import {
    mapState
} from 'vuex'
export default {
    name: 'AuiContractList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        ...mapState('contracts', [
            'statusOptions'
        ]),
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
                    name: 'external_id',
                    label: this.$t('External #'),
                    field: 'external_id',
                    sortable: true,
                    editable: true,
                    component: 'input',
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
                    componentOptionsGetter: 'contracts/filteredSystemContactsAsOptions',
                    componentOptionsAction: 'contracts/filterSystemContacts'
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
                    componentOptions: this.statusOptions
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'contractEdit'
            ]
        }
    }
}
</script>
