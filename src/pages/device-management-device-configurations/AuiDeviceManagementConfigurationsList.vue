<template>
    <aui-data-table
        ref="dataTable"
        table-id="pbxdevices"
        row-key="id"
        resource="pbxdeviceconfigs"
        resource-type="api"
        :resource-singular="$t('Device Configuration')"
        :title="$t('Device Configurations')"
        :columns="columns"
        :searchable="true"
        :editable="true"
        :addable="true"
        :add-action-routes="[{ name: 'deviceManagementConfigurationCreation' }]"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Delete')"
        :deletion-text="'You are about to delete Device Configuration # {subject}'"
        deletion-subject="id"
        :row-menu-route-intercept="rowActionRouteIntercept"
        :row-actions="rowActions"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { WAIT_PAGE } from 'src/constants'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDeviceManagementConfigurationsList',
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
                    name: 'version',
                    label: this.$t('Version'),
                    field: 'version',
                    sortable: true,
                    align: 'left',
                    editable: true
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            apiDownloadConfigurationFile: WAIT_PAGE
        }),
        rowActions ({ row }) {
            return [
                'deviceManagementConfigurationEdit',
                {
                    id: 'deviceManagementConfigurationDownload',
                    color: 'primary',
                    icon: 'fas fa-download',
                    label: this.$t('Download'),
                    visible: true,
                    click: () => {
                        this.apiDownloadConfigurationFile({
                            id: row.id,
                            filename: row.filename
                        })
                    }
                }
            ]
        },
        rowActionRouteIntercept ({ route, row }) {
            if (['deviceManagementConfigurationEdit'].includes(route?.name)) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
