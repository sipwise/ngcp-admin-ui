<template>
    <aui-base-list-page
        acl-resource="entity.subscribers"
        :row-action-route-names="rowActionRouteNames"
        :delete-button-label="deletionButtonLabel"
    >
        <aui-data-table
            :title="$t('Subscribers')"
            table-id="subscribers"
            resource="subscribers"
            resource-type="api"
            resource-search-field="webusername"
            :resource-singular="$t('Subscriber')"
            :columns="columns"
            :show-header="false"
            :deletable="true"
            :deletion-label="deletionButtonLabel"
            deletion-subject="webusername"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-list-page>
</template>

<script>
import AuiBaseListPage from 'pages/AuiBaseListPage'
import AuiDataTable from 'components/AuiDataTable'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiSubscriberList',
    components: {
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTableColumn
    ],
    computed: {
        deletionButtonLabel () {
            return this.$t('Terminate')
        },
        rowActionRouteNames () {
            return [
                'subscriberDetails',
                'subscriberPreferences'
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
                    name: 'webusername',
                    label: this.$t('Webusername'),
                    field: 'webusername',
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
                    formatter: ({ row }) => {
                        return row.primary_number.cc + row.primary_number.ac + row.primary_number.sn
                    },
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
