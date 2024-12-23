<template>
    <aui-base-sub-context>
        <aui-data-table
            ref="dataTable"
            table-id="billingfees"
            row-key="id"
            resource="billingfees"
            :resource-default-filters="() => ({
                billing_profile_id: billingProfileContextResourceId
            })"
            resource-base-path="billingfee"
            resource-type="api"
            :resource-singular="$t('Billing Fees')"
            :title="$t('Billing Fees')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'billingFeeCreation'}
            ]"
            :deletable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            deletion-subject="id"
            :show-header="false"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-mx-xs"
                    icon="fas fa-download"
                    :label="$t('Download Fees as CSV')"
                    :disable="$waitPage($wait)"
                    @click.stop="download"
                />
                <aui-list-action
                    icon="fas fa-upload"
                    :label="$t('Upload Fees as CSV')"
                    :to="{ name: 'billingFeeUpload'}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiBillingFeesList',
    components: {
        AuiBaseSubContext,
        AuiDataTable,
        AuiListAction
    },
    mixins: [
        dataTable,
        dataTableColumn,
        billingProfileContextMixin
    ],
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters('billing', [
            'matchModeOptions',
            'directionOptions'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'source',
                    label: this.$t('Source Pattern'),
                    field: 'source',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'destination',
                    label: this.$t('Destination Pattern'),
                    field: 'destination',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'match_mode',
                    label: this.$t('Match Mode'),
                    field: 'match_mode',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchModeOptions
                },
                {
                    name: 'direction',
                    label: this.$t('Direction'),
                    field: 'direction',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.directionOptions
                },
                {
                    name: 'billing_zone',
                    label: this.$t('Billing Zone'),
                    field: 'billing_zone_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('billing', {
            downloadCsv: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['billingFeeEdit'], route?.name)) {
                route.params.id = this.billingProfileContextResourceId
                route.params.billingFeeId = row.id
            }
            return route
        },
        async download () {
            await this.downloadCsv(this.billingProfileContextResourceId)
        },
        rowActions () {
            return [
                'billingFeeEdit'
            ]
        }
    }
}
</script>
