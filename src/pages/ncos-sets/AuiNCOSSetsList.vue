<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="ncossets"
            resource="ncos"
            resource-path="ncos/sets"
            resource-base-path="ncosset"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :use-api-v2="true"
            resource-type="api"
            :resource-singular="$t('NCOS Sets')"
            row-key="id"
            :title="$t('NCOS Sets')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{name: 'ncosSetsCreate'}]"
            :deletable="true"
            deletion-subject="name"
            :show-header="false"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
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
export default {
    name: 'AuiNCOSSetsList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    computed: {
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
                    name: 'reseller_id',
                    label: this.$t('Reseller'),
                    sortable: true,
                    align: 'left',
                    editable: true,
                    field: 'reseller_id',
                    component: 'select-lazy',
                    componentIcon: 'fas fa-user-tie',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
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
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Description must not be empty')
                        }
                    ]
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
                'ncosSetsEdit',
                'ncosSetLevelsList',
                'ncosSetsJournal'
            ]
        }
    }
}
</script>
