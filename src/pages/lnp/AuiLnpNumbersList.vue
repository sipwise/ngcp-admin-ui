<template>
    <aui-base-sub-context
        class="q-pt-none"
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="lnpnumbers"
            row-key="id"
            resource="lnpnumbers"
            resource-base-path="lnpnumbers"
            resource-type="api"
            :resource-singular="$t('LNP Number')"
            :title="$t('LNP Numbers')"
            :columns="columns"
            :deletable="true"
            :searchable="true"
            :addable="true"
            :editable="true"
            :show-header="false"
            resource-search-field="number"
            :resource-search-wildcard="true"
            :resource-default-filters="resourceDefaultFilters"
            :search-criteria-config="searchCriteriaConfig"
            deletion-subject="id"
            :add-action-routes="addActionRoutes"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
        >
            <template
                v-if="!carrierId"
                #list-actions
            >
                <aui-list-action
                    class="q-mx-xs"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    data-cy="lnp-numbers-list-download-csv"
                    :disable="$waitPage($wait)"
                    @click.stop="handleDownloadCsv()"
                />
                <aui-list-action
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    data-cy="lnp-numbers-list-upload-csv"
                    :to="{ name: 'lnpUpload' }"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import { numeric, required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
import lnpNumbersContextMixin from 'src/mixins/data-context-pages/lnp-numbers'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import subContext from 'src/mixins/sub-context'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpNumberList',
    components: {
        AuiDataTable,
        AuiBaseSubContext,
        AuiListAction
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subContext,
        lnpCarrierContextMixin,
        lnpNumbersContextMixin
    ],
    computed: {
        carrierId () {
            return this.$route.params?.id || null
        },
        addActionRoutes () {
            return this.carrierId ? [{ name: 'lnpCarrierNumberCreation' }] : [{ name: 'lnpNumberCreation' }]
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'number',
                    label: this.$t('Number'),
                    field: 'number',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        },
                        {
                            name: 'numeric',
                            validator: numeric,
                            error: this.$t('Number must be a valid E164 number')
                        }
                    ]
                },
                {
                    name: 'routing_number',
                    label: this.$t('Routing Number'),
                    field: 'routing_number',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'start',
                    label: this.$t('Start Date'),
                    field: 'start',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'end',
                    label: this.$t('End Date'),
                    field: 'end',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'carrier_name',
                    label: this.$t('Carrier Name'),
                    field: 'carrier_id_expand.name',
                    expand: 'carrier_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        resourceDefaultFilters () {
            return this.carrierId ? { carrier_id: this.carrierId } : {}
        },
        searchCriteriaConfig () {
            const criteria = [
                {
                    criteria: 'number',
                    label: this.$t('Number'),
                    component: 'input'
                }
            ]

            if (!this.carrierId) {
                criteria.push({
                    criteria: 'carrier_id',
                    label: this.$t('Carrier'),
                    component: 'input',
                    wildcard: false
                })
            }

            return criteria
        }
    },
    methods: {
        ...mapWaitingActions('lnp', {
            downloadLnpCsv: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (this.carrierId && ['lnpCarrierNumberEdit'].includes(route?.name)) {
                route.params.id = this.carrierId
                route.params.numberId = row.id
            }
            return route
        },
        rowActions () {
            return this.carrierId ? ['lnpCarrierNumberEdit'] : ['lnpNumberEdit']
        },
        async handleDownloadCsv () {
            return this.downloadLnpCsv()
        }
    }
}
</script>
