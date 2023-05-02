<template>
    <aui-base-sub-context>
        <!-- TODO using "ajax" instead of "api" due to missing contract_cnt and package_cnt -->
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="billing"
            row-key="id"
            resource="billingprofiles"
            resource-base-path="billing"
            resource-type="ajax"
            :resource-alt="resourceUrl"
            :resource-singular="$t('Billing profile')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsBillingProfileCreation'}]"
            :searchable="true"
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
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import { required } from '@vuelidate/validators'
import dataTable from 'src/mixins/data-table'
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
        resourceUrl () {
            return 'billing/ajax/filter_reseller/' + this.resourceObject.id
        },
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
                    align: 'left'
                },
                {
                    name: 'package_cnt',
                    label: this.$t('Used (packages)'),
                    field: 'package_cnt',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.resourceObject.id
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
