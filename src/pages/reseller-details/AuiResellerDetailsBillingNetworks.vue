<template>
    <aui-base-sub-context>
        <!-- TODO using "ajax" instead of "api" due to missing contract_cnt and package_cnt -->
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="network"
            row-key="id"
            resource="billingnetworks"
            resource-base-path="network"
            resource-type="ajax"
            :resource-alt="resourceUrl"
            :resource-singular="$t('Network')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsBillingNetworkCreation' }]"
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
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsBillingNetworks',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTable
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        resourceUrl () {
            return `network/ajax/filter_reseller/${this.resourceObject.id}`
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
                },
                {
                    name: 'blocks_grp',
                    label: this.$t('Network Blocks'),
                    field: 'blocks_grp',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.resourceObject.id
            route.params.billingNetworkId = row.id
            return route
        },
        rowActions () {
            return [
                'resellerDetailsBillingNetworkEdit'
            ]
        }
    }
}
</script>
