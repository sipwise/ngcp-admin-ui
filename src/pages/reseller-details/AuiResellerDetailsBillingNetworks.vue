<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="network"
            row-key="id"
            resource="billingnetworks"
            resource-search-field="name"
            :resource-default-filters="{
                reseller_id: resourceObject.id,
                contract_cnt: 10,
                package_cnt: true
            }"
            resource-base-path="network"
            resource-type="api"
            :resource-singular="$t('Network')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsBillingNetworkCreation' }]"
            :searchable="true"
            :search-criteria-config="[
                {
                    criteria: 'ip',
                    label: $t('IP'),
                    component: 'input'
                },
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input',
                    wildcard: true
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
                    sortable: false,
                    align: 'left',
                    format: (val) => {
                        return val >= 10 ? '10+' : val
                    }
                },
                {
                    name: 'package_cnt',
                    label: this.$t('Used (packages)'),
                    field: 'package_cnt',
                    sortable: false,
                    align: 'left',
                    format: (val) => {
                        return val >= 10 ? '10+' : val
                    }
                },
                {
                    name: 'blocks',
                    label: this.$t('Network Blocks'),
                    field: 'blocks',
                    sortable: false,
                    align: 'left',
                    formatter: ({ value }) => this.formatNetworkBlocks(value)
                }
            ]
        }
    },
    methods: {
        formatNetworkBlocks (blocks) {
            if (!Array.isArray(blocks)) {
                return this.$t('N/A')
            }

            const value = blocks
                .map(({ ip, mask }) => mask === null ? ip : `${ip}/${mask}`)
                .join(', ')

            if (!value) {
                return this.$t('N/A')
            }

            return value.length > 30 ? `${value.slice(0, 30)}...` : value
        },
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
