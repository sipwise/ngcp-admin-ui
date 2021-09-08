<template>
    <aui-base-list-page
        acl-resource="entity.resellers"
        :add-button-split="true"
        :add-button-routes="[ { name: 'resellerCreation'} ]"
        :row-action-split="true"
        :row-action-route-names="rowActionsRouteNames"
        :delete-button-label="$t('Terminate')"
    >
        <aui-data-table
            ref="table"
            table-id="resellers"
            row-key="id"
            resource="resellers"
            resource-search-field="name"
            :resource-default-filters="{ status: 'active,locked' }"
            resource-base-path="reseller"
            resource-type="api"
            resource-alt="reseller/ajax"
            resource-singular="reseller"
            resource-plural="resellers"
            :deletion-label="$t('Terminate')"
            :title="$t('Resellers')"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="true"
            :show-header="false"
            deletion-subject="name"
            :deletion-title="$t('Terminate {resource}')"
            :deletion-text="$t('You are about to terminate {resource} {subject}')"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :row-menu-route-names="rowActionsRouteNames"
        >
            <template
                v-slot:custom-component-contract_id="props"
            >
                <aui-popup-edit-contract
                    :label="props.row.contract_id + ''"
                    :value="props.row.contract_id"
                    :is-reseller="true"
                    :resource="'resellers'"
                    @save="$refs.table.patchField('contract_id', $event.value, props)"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupEditContract from 'components/popup-edit/AuiPopupEditContract'
import { required } from 'vuelidate/lib/validators'
import AuiBaseListPage from 'pages/AuiBaseListPage'
export default {
    name: 'AuiPageResellers',
    components: {
        AuiBaseListPage,
        AuiPopupEditContract,
        AuiDataTable
    },
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
                },
                {
                    name: 'enable_rtc',
                    label: this.$t('WebRTC'),
                    field: 'enable_rtc',
                    sortable: true,
                    editable: true,
                    component: 'toggle',
                    align: 'left'
                }
            ]
        },
        rowActionsRouteNames () {
            return [
                'resellerEdit',
                'resellerDetails',
                'resellerPreferences'
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
