<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            :title="$t('Subscribers')"
            table-id="subscribers"
            resource="subscribers"
            resource-type="api"
            resource-search-field="username"
            :resource-search-wildcard="true"
            :resource-singular="$t('Subscriber')"
            :columns="columns"
            :show-header="false"
            :deletable="true"
            :editable="true"
            :searchable="true"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="webusername"
            :row-menu-route-names="rowActionRouteNames"
            :search-criteria-config="[
                {
                    criteria: 'username',
                    label: $t('Username'),
                    component: 'input'
                },
                {
                    criteria: 'profile_id',
                    label: $t('Subscriber Profile ID'),
                    component: 'input'
                },
                {
                    criteria: 'webusername',
                    label: $t('Webusername'),
                    component: 'input'
                },
                {
                    criteria: 'domain',
                    label: $t('Domain'),
                    component: 'input'
                },
                {
                    criteria: 'customer_id',
                    label: $t('Customer ID'),
                    component: 'input'
                },
                {
                    criteria: 'customer_external_id',
                    label: $t('Customer External ID'),
                    component: 'input'
                },
                {
                    criteria: 'subscriber_external_id',
                    label: $t('Subscriber External ID'),
                    component: 'input'
                },
                {
                    criteria: 'alias',
                    label: $t('Alias'),
                    component: 'input'
                },
                {
                    criteria: 'reseller_id',
                    label: $t('Reseller ID'),
                    component: 'input'
                },
                {
                    criteria: 'contact_id',
                    label: $t('Contact ID'),
                    component: 'input'
                },
                {
                    criteria: 'primary_number',
                    label: $t('Primary Number'),
                    component: 'input'
                },
                {
                    criteria: 'pbx_extension',
                    label: $t('PBX Extension'),
                    component: 'input'
                },
                {
                    criteria: 'display_name',
                    label: $t('Display Name'),
                    component: 'input'
                },
            ]"
        >
            <template
                #row-more-menu="scope"
            >
                <aui-popup-menu-item
                    v-if="scope.row"
                    :icon="$routeMeta.$icon({ name: 'customerList' })"
                    :label="$t('Customer')"
                    :to="{ name: 'customerDetails', params: { id: scope.row.customer_id } }"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import AuiBaseListPage from 'pages/AuiBaseListPage'
import AuiDataTable from 'components/AuiDataTable'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { formatPhoneNumber } from 'src/filters/resource'
export default {
    name: 'AuiSubscriberList',
    components: {
        AuiPopupMenuItem,
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        rowActionRouteNames () {
            return [
                'subscriberDetails',
                'subscriberPreferences',
                'subscriberCallHistory'
            ]
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'customer_id',
                    label: this.$t('Contract'),
                    field: 'customer_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'customer_contact_email',
                    label: this.$t('Contact E-Mail'),
                    field: 'customer_id_expand.contact_id_expand.email',
                    expand: 'customer_id.contact_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'username',
                    label: this.$t('Username'),
                    field: 'username',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'domain',
                    label: this.$t('Domain'),
                    field: 'domain',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'uuid',
                    label: this.$t('UUID'),
                    field: 'uuid',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'primary_number',
                    label: this.$t('Number'),
                    field: 'primary_number',
                    formatter: ({ row }) => formatPhoneNumber(row.primary_number, ''),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'profile',
                    label: this.$t('Profile'),
                    field: 'profile_id_expand.name',
                    expand: 'profile_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
