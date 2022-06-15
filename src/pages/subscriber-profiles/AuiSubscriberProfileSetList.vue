<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="subscriberprofilesets"
            resource="subscriberprofilesets"
            resource-base-path="subscriberprofile"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-type="api"
            resource-alt="subscriberprofile/ajax"
            :resource-singular="$t('Subscriber Profile Set')"
            row-key="id"
            :title="$t('Subscriber Profile Sets')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{name: 'subscriberProfileSetCreate'}]"
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
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import { required } from 'vuelidate/lib/validators'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSubscriberProfileSetList',
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
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.profileSetId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberProfileSetEdit',
                'subscriberProfileSetClone',
                'subscriberProfileList'
            ]
        }
    }
}
</script>
