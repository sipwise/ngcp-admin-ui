<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="billingProfilePackageContext"
            ref="table"
            table-id="package-vouchers"
            resource="profilepackages"
            resource-base-path="package"
            resource-type="ajax"
            :resource-alt="resourceUrl"
            :resource-singular="$t('Vouchers')"
            title=""
            :columns="columns"
            :searchable="true"
            :addable="false"
            :deletable="false"
            :editable="false"
            :show-header="false"
            selection="none"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiProfilePackagesDetailsVouchers',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        billingProfilePackageContextMixin
    ],
    computed: {
        resourceUrl () {
            return `voucher/ajax/package/${this.billingProfilePackageContext.id}`
        },
        columns () {
            return [
                this.idColumn,
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
                {
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'customer_id',
                    label: this.$t('For Contract #'),
                    field: 'customer_id',
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
                    label: this.$t('Used By Subscriber #'),
                    field: 'used_by_subscriber_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
