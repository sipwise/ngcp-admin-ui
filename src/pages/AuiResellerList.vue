<template>
    <aui-base-list-page
        acl-resource="entity.resellers"
        :add-button-split="true"
        :add-button-routes="[
            { name: 'resellerCreation'}
        ]"
        :edit-button-split="true"
        :edit-button-routes="editButtonRoutes"
        :delete-button-label="$t('Terminate')"
        :rows-selected="selectedRows.length > 0"
        :loading="$wait.is('aui-data-table-*')"
        @search="search"
        @delete="deleteSelectedRow"
    >
        <aui-data-table
            ref="table"
            table-id="resellers"
            row-key="id"
            resource="resellers"
            resource-search-field="name"
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
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            @rows-selected="selectedRows=$event"
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
            <template
                v-slot:custom-component-contract_id="props"
            >
                <aui-popup-edit-contract
                    :label="props.row.contract_id + ''"
                    :value="props.row.contract_id"
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
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiPageResellers',
    components: {
        AuiPopupMenuItem,
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
        editButtonRoutes () {
            const routes = []
            this.editButtonRouteNames.forEach((routeName) => {
                routes.push({ name: routeName, params: { id: this.resourceId } })
            })
            return routes
        },
        editButtonRouteNames () {
            return [
                'resellerEdit',
                'resellerDetails',
                'resellerPreferences'
            ]
        },
        resourceId () {
            if (this.selectedRows && this.selectedRows.length > 0) {
                return this.selectedRows[0].id
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
        },
        routeByName (name, row) {
            return { name: name, params: { id: row.id } }
        }
    }
}
</script>
