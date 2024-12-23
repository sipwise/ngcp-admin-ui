<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            :title="$t('Billing Networks')"
            table-id="network"
            resource="billingnetworks"
            :resource-type="resourceType"
            resource-alt="network/ajax"
            resource-base-path="network"
            resource-search-field="name"
            :resource-search-wildcard="true"
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
                    'billingNetworkJournal'
                ]
            }"
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
                this.getResellerNameColumn(this.resourceType),
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
        },
        resourceType () {
            return 'ajax'
        }
    }
}
</script>
