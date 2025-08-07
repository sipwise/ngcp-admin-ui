<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="billingvouchers"
            row-key="id"
            resource="vouchers"
            resource-type="api"
            :resource-singular="$t('Billing Vouchers')"
            :title="$t('Billing Vouchers')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'billingVoucherCreation'}
            ]"
            :deletable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            deletion-subject="id"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'base64_code',
                    label: $t('code'),
                    component: 'input',
                    wildcard: false
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import _ from 'lodash'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiBillingVouchersList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'code',
                    label: this.$t('Code'),
                    field: 'code',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'amount',
                    label: this.$t('Amount'),
                    field: 'amount',
                    sortable: true,
                    align: 'left'
                },
                this.getResellerNameColumn(),
                {
                    name: 'package_id',
                    label: this.$t('Package'),
                    field: 'package_id_expand.name',
                    expand: 'package_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'customer_id',
                    label: this.$t('For Contract'),
                    field: 'customer_id_expand.contact_id_expand.email',
                    expand: 'customer_id.contact_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'valid_until',
                    label: this.$t('Valid Until'),
                    field: 'valid_until',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'used_at',
                    label: this.$t('Used At'),
                    field: 'used_at',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'used_by_subscriber_id',
                    label: this.$t('Used By Subscriber'),
                    field: 'used_by_subscriber_id',
                    sortable: true,
                    align: 'left'
                }

            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['billingVoucherEdit'], route?.name)) {
                route.params.id = row.id
            }
            return route
        },
        rowActions () {
            return [
                'billingVoucherEdit'
            ]
        }
    }
}
</script>
