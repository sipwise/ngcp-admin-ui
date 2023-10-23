<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="billingProfilePackageContext"
            ref="table"
            table-id="package-customers"
            resource="customers"
            :resource-default-filters="{
                profile_package_id: billingProfilePackageContext.id,
                expand: 'contact_id',
            }"
            resource-base-path="customer"
            resource-type="api"
            :resource-singular="$t('Customer Contracts')"
            title=""
            :columns="columns"
            :searchable="true"
            :addable="false"
            :deletable="false"
            :editable="false"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'status',
                    label: $t('Status'),
                    wildcard: false,
                    component: 'customerStatus',
                    exclude: ['not_status']
                },
                {
                    criteria: 'not_status',
                    label: $t('Not Status'),
                    wildcard: false,
                    component: 'customerStatus',
                    exclude: ['status']
                },
                {
                    criteria: 'external_id',
                    label: $t('External #'),
                    wildcard: false,
                    component: 'input'
                }
            ]"
            selection="none"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import dataTableColumn from 'src/mixins/data-table-column'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
export default {
    name: 'AuiProfilePackagesDetailsCustomers',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        billingProfilePackageContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'external_id',
                    label: this.$t('External #'),
                    field: 'external_id',
                    sortable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'contact_email',
                    label: this.$t('Contact Email'),
                    field: 'contact_id_expand.email',
                    expand: 'contact_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    align: 'left'
                }

            ]
        }
    }
}
</script>
