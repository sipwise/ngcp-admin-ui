<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="resellers"
            row-key="id"
            resource="resellers"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="{ status: 'active,locked' }"
            resource-base-path="reseller"
            resource-type="api"
            resource-alt="reseller/ajax"
            :resource-singular="$t('Reseller')"
            :title="$t('Resellers')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'resellerCreation'}]"
            :deletable="true"
            :show-header="false"
            :show-more-menu="!canEdit"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="name"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                },
                {
                    criteria: 'status',
                    label: $t('Status'),
                    wildcard: false,
                    component: 'resellerStatus'
                }
            ]"
        >
            <template
                #custom-component-contract_id="props"
            >
                <aui-popup-edit-contract
                    :label="props.row.contract_id + ''"
                    :value="props.row.contract_id"
                    :is-reseller="true"
                    :resource="'resellers'"
                    @save="$refs.dataTable.patchField('contract_id', $event.value, props)"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupEditContract from 'components/popup-edit/AuiPopupEditContract'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiResellerList',
    components: {
        AuiBaseListPage,
        AuiPopupEditContract,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        ...mapGetters('resellers', [
            'resellerStatusOptions'
        ]),
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
                    name: 'contract_id',
                    label: this.$t('Contract'),
                    field: 'contract_id',
                    sortable: true,
                    editable: true,
                    component: 'custom',
                    componentField: 'contract_id',
                    componentOptionsGetter: 'contracts/filteredResellerOptions',
                    componentOptionsAction: 'contracts/filterContracts',
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    componentIcon: 'fas fa-user-tie',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        }
                    ],
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    editable: true,
                    component: 'select',
                    componentOptions: this.resellerStatusOptions,
                    align: 'left'
                }
            ]
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    methods: {
        routeByName (name, row) {
            return { name, params: { id: row.id } }
        },
        rowActions () {
            return [
                'resellerEdit',
                'resellerDetails',
                'resellerPreferences',
                'resellerJournal'
            ]
        }
    }
}
</script>
