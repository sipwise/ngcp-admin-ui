<template>
    <aui-base-list-page
        acl-resource="entity.contracts"
        :add-button-split="false"
        :add-button-routes="[
            { name: 'contractCreatePeering'},
            { name: 'contractCreateReseller'}
        ]"
        :edit-button-routes="[
            editButtonRoute
        ]"
        :delete-button-label="$t('Terminate')"
        :rows-selected="selectedRows.length > 0"
        :loading="$wait.is('aui-data-table-*')"
        @search="search"
        @delete="deleteSelectedRow"
    >
        <aui-data-table
            ref="table"
            table-id="contracts"
            row-key="id"
            resource="contracts"
            resource-base-path="contract"
            resource-type="ajax"
            resource-alt="contract/ajax"
            resource-singular="contract"
            resource-plural="contracts"
            :deletion-label="$t('Terminate')"
            :title="$t('Contracts')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="true"
            deletion-subject="id"
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :show-header="false"
            @rows-selected="selectedRows=$event"
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
        editButtonRoute () {
            if (this.selectedRows && this.selectedRows.length > 0) {
                return { name: 'contractEdit', params: { id: this.selectedRows[0].id } }
            } else {
                return ''
            }
        }
    },
    methods: {
        search (value) {
            this.$refs.table.triggerReload({
                tableFilter: value
            })
        },
        deleteSelectedRow () {
            this.$refs.table.confirmRowDeletion(this.selectedRows[0])
        }
    }
}
</script>
