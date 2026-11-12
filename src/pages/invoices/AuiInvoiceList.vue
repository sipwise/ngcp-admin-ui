<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="invoices"
            row-key="id"
            resource="invoices"
            resource-base-path="invoice"
            resource-type="api"
            use-api-v2
            data-request-action="invoices/requestInvoices"
            :resource-singular="$t('Invoice')"
            :title="$t('Invoices')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'invoiceCreation'}]"
            :deletable="true"
            :show-header="false"
            :row-actions="rowActions"
            :search-criteria-config="searchCriteriaConfig"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import { WAIT_PAGE } from 'src/constants'
import { getMonthPeriod, getPreviousMonth } from 'src/helpers/invoices'
import dataTable from 'src/mixins/data-table'
import { mapWaitingActions } from 'vue-wait'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiInvoiceList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        ...mapGetters('resellers', [
            'resellerStatusOptions'
        ]),
        ...mapGetters('user', [
            'isReseller'
        ]),
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('ID'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'customer_id',
                    label: this.$t('Contract ID'),
                    field: 'customer_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'contract_contact_email',
                    label: this.$t('Contract Email'),
                    field: 'customer_id_expand.contact_id_expand.email',
                    expand: 'customer_id.contact_id',
                    align: 'left'
                },
                {
                    name: 'contract_product_name',
                    label: this.$t('Product Name'),
                    field: 'customer_id_expand.type',
                    expand: 'customer_id',
                    formatter: ({ value }) => {
                        switch (value) {
                            case 'sipaccount':
                                return this.$t('Basic SIP Account')
                            case 'pbxaccount':
                                return this.$t('Cloud PBX Account')
                            case 'sippeering':
                                return this.$t('SIP Peering')
                            case 'pstnpeering':
                                return this.$t('PSTN Peering')
                            case 'reseller':
                                return this.$t('VoIP Reseller')
                            default:
                                return value
                        }
                    },
                    align: 'left'
                },
                {
                    name: 'serial',
                    label: this.$t('Serial'),
                    field: 'serial',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        searchCriteriaConfig () {
            return [
                {
                    criteria: 'serial',
                    label: this.$t('Serial'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'customer_id',
                    label: this.$t('Contract ID'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: 'reseller_id',
                    label: this.$t('Reseller ID'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: ['period_start_ge', 'period_end_le'],
                    label: this.$t('Period'),
                    component: 'input_date_range',
                    wildcard: false,
                    defaultFilter: () => getMonthPeriod(getPreviousMonth())
                }
            ].filter((config) => !this.isReseller || config.criteria !== 'reseller_id')
        }
    },
    methods: {
        ...mapWaitingActions('invoices', {
            downloadFile: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (route?.name === 'invoiceDownload') {
                route.params.id = row.id
            }
            return route
        },
        async downloadPdf (id) {
            await this.downloadFile(id)
        },
        rowActions ({ row }) {
            return [
                {
                    id: 'invoiceDownload',
                    color: 'primary',
                    icon: 'fas fa-file-invoice-dollar',
                    label: this.$t('Download'),
                    visible: true,
                    click: async () => {
                        await this.downloadPdf(row.id)
                    }
                }
            ]
        }
    }
}
</script>
