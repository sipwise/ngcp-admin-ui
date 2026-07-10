<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="billing"
            row-key="id"
            resource="billingprofiles"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="{
                reseller_id: resourceObject.id,
                contract_cnt: 10,
                package_cnt: true
            }"
            resource-base-path="billing"
            resource-type="api"
            :resource-singular="$t('Billing profile')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsBillingProfileCreation' }]"
            :searchable="true"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
            :editable="true"
            :deletable="true"
            :row-deletable="(row) => row.contract_cnt < 1 && row.package_cnt < 1"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsBillingProfiles',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
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
                    name: 'prepaid',
                    label: this.$t('Prepaid'),
                    field: 'prepaid',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'toggle'
                },
                {
                    name: 'contract_cnt',
                    label: this.$t('Used (contracts)'),
                    field: 'contract_cnt',
                    sortable: true,
                    align: 'left',
                    format: (val) => {
                        return val > 10 ? '10+' : val
                    }
                },
                {
                    name: 'package_cnt',
                    label: this.$t('Used (packages)'),
                    field: 'package_cnt',
                    sortable: true,
                    align: 'left',
                    format: (val) => {
                        return val > 10 ? '10+' : val
                    }
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const resellerId = this.resourceObject.id
            route.params.id = resellerId
            route.params.billingProfileId = row.id
            return route
        },
        rowActions () {
            return [
                'resellerDetailsBillingProfileEdit'
            ]
        }
    }
}
</script>
