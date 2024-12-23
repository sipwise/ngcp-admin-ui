<template>
    <aui-data-table
        ref="dataTable"
        table-id="pbxdevices"
        row-key="id"
        resource="pbxdevices"
        resource-type="api"
        :resource-singular="$t('Deployed Device')"
        :title="$t('Deployed Devices')"
        :columns="columns"
        :searchable="true"
        :editable="false"
        :addable="false"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Delete')"
        :deletion-text="'You are about to delete Deployed Device # {subject}'"
        deletion-subject="id"
        :row-menu-route-intercept="rowActionRouteIntercept"
        :row-actions="rowActions"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'

export default {
    name: 'AuiDeviceManagementDeployedDevicesList',
    components: { AuiDataTable },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'identifier',
                    label: this.$t('MAC Address / Identifier'),
                    field: 'identifier',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'profile_name',
                    label: this.$t('Profile Name'),
                    field: 'profile_id_expand.name',
                    expand: 'profile_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'customer_id',
                    label: this.$t('Customer #'),
                    field: 'customer_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'customer_contact_email',
                    label: this.$t('Customer Email'),
                    field: 'customer_id_expand.contact_id_expand.email',
                    expand: 'customer_id.contact_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'deviceManagementDeployedDeviceConfiguration',
                'deviceManagementDeployedDevicePreferences'
            ]
        },
        rowActionRouteIntercept ({ route, row }) {
            if (['deviceManagementDeployedDeviceConfiguration', 'deviceManagementDeployedDevicePreferences'].includes(route?.name)) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
