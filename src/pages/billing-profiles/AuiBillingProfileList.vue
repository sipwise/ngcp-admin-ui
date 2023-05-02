<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="billingprofiles"
            resource="billingprofiles"
            resource-base-path="billingprofile"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-type="ajax"
            resource-alt="billing/ajax"
            :resource-singular="$t('Billing Profiles')"
            row-key="id"
            :title="$t('Billing Profiles')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :row-editable="() => true"
            :addable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :add-action-routes="[{ name: 'billingProfileCreation'}]"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="() => {
                return [
                    'billingProfileEdit',
                    'billingProfileDuplicate',
                    'billingProfileFees',
                    'billingProfileZones',
                    'billingProfilePeaktimes'
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
    name: 'AuiBillingProfilesList',
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
                    name: 'reseller',
                    label: this.$t('Reseller'),
                    field: 'handle',
                    sortable: true,
                    align: 'left',
                    editable: false
                },
                {
                    name: 'prepaid',
                    label: this.$t('Prepaid'),
                    field: 'prepaid',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'used_contracts',
                    label: this.$t('Used (contracts)'),
                    field: 'contract_cnt',
                    sortable: true,
                    align: 'left',
                    editable: false
                },
                {
                    name: 'used_packages',
                    label: this.$t('Used (packages)'),
                    field: 'package_cnt',
                    sortable: true,
                    align: 'left',
                    editable: false
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
