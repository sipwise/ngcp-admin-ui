<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="soundsets"
            resource="soundsets"
            resource-base-path="soundset"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-type="api"
            :resource-singular="$t('Sound Sets')"
            row-key="id"
            :title="$t('Sound Sets')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :add-action-routes="[{ name: 'soundSetsCreation'}]"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="() => {
                return [
                    'soundSetsEdit',
                    'soundSetHandles',
                    'soundSetDefault'
                ]}"
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
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import { required } from '@vuelidate/validators'
export default {
    name: 'AuiSoundSetsList',
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
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_id_expand.name',
                    expand: 'reseller_id',
                    sortable: true,
                    editable: true,
                    component: 'select-lazy',
                    componentIcon: 'fas fa-user-tie',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers',
                    align: 'left'
                },
                {
                    name: 'customer_contact_email',
                    label: this.$t('Customer'),
                    field: 'customer_id_expand.contact_id_expand.email',
                    expand: 'customer_id.contact_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    editable: true,
                    align: 'left',
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
                    editable: true,
                    align: 'left',
                    component: 'input'
                },
                {
                    name: 'parent_name',
                    label: this.$t('Parent'),
                    field: 'parent_name',
                    sortable: true,
                    editable: false,
                    align: 'left',
                    component: 'input'
                },
                {
                    name: 'expose_to_customer',
                    label: this.$t('Expose to Customer'),
                    field: 'expose_to_customer',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (row) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
