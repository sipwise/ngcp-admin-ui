<template>
    <aui-data-table
        ref="dataTable"
        table-id="pbxdevices"
        row-key="id"
        resource="pbxdevicemodels"
        resource-type="api"
        :resource-singular="$t('Device Model')"
        :title="$t('Device Models')"
        :columns="columns"
        :searchable="true"
        :editable="true"
        :addable="true"
        :add-action-routes="[{ name: 'deviceManagementModelCreation' }]"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Delete')"
        :deletion-text="'You are about to delete Device Model # {subject}'"
        deletion-subject="id"
        :row-menu-route-intercept="rowActionRouteIntercept"
        :row-actions="rowActions"
        :search-criteria-config="[
            {
                criteria: 'type',
                label: $t('Type'),
                component: 'input'
            },
            {
                criteria: 'vendor',
                label: $t('Vendor'),
                component: 'input'
            },
            {
                criteria: 'model',
                label: $t('Model'),
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
    name: 'AuiDeviceManagementModelsList',
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
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    ...this.expandedResellerNameColumn,
                    editable: false,
                    sortable: true

                },
                {
                    name: 'vendor',
                    label: this.$t('Vendor'),
                    field: 'vendor',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    name: 'model',
                    label: this.$t('Model'),
                    field: 'model',
                    sortable: true,
                    align: 'left',
                    editable: true
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'deviceManagementModelEdit',
                'deviceManagementModelPreferences',
                'deviceManagementModelFrontimage'
            ]
        },
        rowActionRouteIntercept ({ route, row }) {
            if (['deviceManagementModelEdit', 'deviceManagementModelPreferences', 'deviceManagementModelFrontimage'].includes(route?.name)) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
