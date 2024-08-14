<template>
    <aui-data-table
        ref="dataTable"
        table-id="pbxdevices"
        row-key="id"
        resource="pbxdeviceprofiles"
        resource-type="api"
        :resource-singular="$t('Device Profile')"
        :title="$t('Device Profiles')"
        :columns="columns"
        :searchable="true"
        :editable="true"
        :addable="true"
        :add-action-routes="[{ name: 'deviceManagementProfileCreation' }]"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Delete')"
        :deletion-text="'You are about to delete Device Profile # {subject}'"
        deletion-subject="id"
        :row-menu-route-intercept="rowActionRouteIntercept"
        :row-actions="rowActions"
        :search-criteria-config="[
            {
                criteria: 'name',
                label: $t('Name'),
                component: 'input',
            }
        ]"
    />
</template>

<script>
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'

export default {
    name: 'AuiDeviceManagementProfilesList',
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
                    name: 'device_reseller_name',
                    label: this.$t('Reseller'),
                    field: 'device_id_expand.reseller_id_expand.name',
                    expand: 'device_id.reseller_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'device_vendor',
                    label: this.$t('Device Vendor'),
                    field: 'device_id_expand.vendor',
                    expand: 'device_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'device_model',
                    label: this.$t('Device Model'),
                    field: 'device_id_expand.model',
                    expand: 'device_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'config_version',
                    label: this.$t('Configuration Version'),
                    field: 'config_id_expand.version',
                    expand: 'config_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'deviceManagementProfileEdit',
                'deviceManagementProfilePreferences'
            ]
        },
        rowActionRouteIntercept ({ route, row }) {
            if (['deviceManagementProfileEdit', 'deviceManagementProfilePreferences'].includes(route?.name)) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
