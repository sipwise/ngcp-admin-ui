<template>
    <aui-data-table
        ref="dataTable"
        table-id="pbxdevices"
        row-key="id"
        resource="pbxdevicefirmwares"
        resource-type="api"
        :resource-singular="$t('Device Firmware')"
        :title="$t('Device Firmwares')"
        :columns="columns"
        :searchable="true"
        :editable="true"
        :addable="true"
        :add-action-routes="[{ name: 'deviceManagementFirmwareUpload' }]"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Delete')"
        :deletion-text="'You are about to delete Device Firmware # {subject}'"
        deletion-subject="id"
        :row-menu-route-intercept="rowActionRouteIntercept"
        :row-actions="rowActions"
        :search-criteria-config="[
            {
                criteria: 'filename',
                label: $t('Firmware file'),
                component: 'input'
            },
            {
                criteria: 'version',
                label: $t('Version'),
                component: 'input'
            },
            {
                criteria: 'tag',
                label: $t('Firmware tag'),
                component: 'input',
            }
        ]"
    />
</template>

<script>
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiDeviceManagementFirmwareList',
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
                    name: 'filename',
                    label: this.$t('Firmware file'),
                    field: 'filename',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    name: 'version',
                    label: this.$t('Version'),
                    field: 'version',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    name: 'tag',
                    label: this.$t('Firmware tag'),
                    field: 'tag',
                    sortable: true,
                    align: 'left',
                    editable: true
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            apiDownloadFirmwareFile: WAIT_PAGE
        }),
        rowActions ({ row }) {
            return [
                'deviceManagementFirmwareEdit',
                {
                    id: 'deviceManagementFirmwareDownload',
                    color: 'primary',
                    icon: 'fas fa-download',
                    label: this.$t('Download'),
                    visible: true,
                    click: () => {
                        this.apiDownloadFirmwareFile({
                            id: row.id,
                            filename: row.filename
                        })
                    }
                }
            ]
        },
        rowActionRouteIntercept ({ route, row }) {
            if (['deviceManagementFirmwareEdit', 'deviceManagementFirmwareDownload'].includes(route?.name)) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
