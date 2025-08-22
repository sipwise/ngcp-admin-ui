<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="ncoslevels"
            resource="ncoslevels"
            resource-base-path="ncoslevel"
            resource-search-field="level"
            :resource-search-wildcard="true"
            resource-type="api"
            :resource-singular="$t('NCOS Levels')"
            row-key="id"
            :title="$t('NCOS Levels')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{name: 'ncosLevelCreate'}]"
            :deletable="true"
            deletion-subject="level"
            :show-header="false"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'level',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNCOSLevelsList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    computed: {
        ...mapGetters('ncosLevels', [
            'modeOptions'
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
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    sortable: true,
                    align: 'left',
                    editable: true,
                    field: 'reseller_id_expand.name',
                    expand: 'reseller_id',
                    component: 'select-lazy',
                    componentIcon: 'fas fa-user-tie',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers'
                },
                {
                    name: 'level',
                    label: this.$t('Name'),
                    field: 'level',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Name must not be empty')
                        }
                    ]
                },
                {
                    name: 'mode',
                    label: this.$t('Mode'),
                    field: 'mode',
                    sortable: true,
                    editable: true,
                    component: 'select',
                    componentOptions: this.modeOptions,
                    align: 'left'
                },
                {
                    name: 'time_set_id',
                    label: this.$t('Time Set ID'),
                    field: 'time_set_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'time_set_invert',
                    label: this.$t('Invert time set matching'),
                    field: 'time_set_invert',
                    sortable: true,
                    align: 'center',
                    editable: (props) => props?.row?.time_set_id !== null,
                    component: 'toggle'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'local_ac',
                    label: this.$t('Include local area code'),
                    field: 'local_ac',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'intra_pbx',
                    label: this.$t('Intra PBX Calls within same customer'),
                    field: 'intra_pbx',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'expose_to_customer',
                    label: this.$t('Expose to customer'),
                    field: 'expose_to_customer',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = row.id
            return route
        },
        rowActions () {
            return [
                'ncosLevelEdit',
                'ncosLevelDetails'
            ]
        }
    }
}
</script>
