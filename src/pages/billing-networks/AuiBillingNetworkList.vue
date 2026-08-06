<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            :title="$t('Billing Networks')"
            table-id="network"
            resource="billingnetworks"
            resource-type="api"
            resource-base-path="network"
            resource-search-field="name"
            :resource-default-filters="{
                contract_cnt: 10,
                package_cnt: true
            }"
            :resource-singular="$t('Billing Network')"
            :show-header="false"
            :columns="columns"
            :addable="true"
            :editable="true"
            :deletable="true"
            :searchable="true"
            :deletion-label="$t('Terminate')"
            deletion-subject="id"
            :deletion-title="$t('Terminate billing network')"
            :deletion-text="'You are about to delete billing network # {subject}'"
            :add-action-routes="[{ name: 'billingNetworkCreation' }]"
            :row-actions="() => {
                return [
                    'billingNetworkEdit',
                ]
            }"
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
        />
    </aui-base-list-page>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiBillingNetworks',
    components: {
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTableColumn,
        dataTable
    ],
    computed: {
        columns () {
            return [
                this.idColumn,
                this.getResellerNameColumn(),
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
        }
    }
}
</script>
