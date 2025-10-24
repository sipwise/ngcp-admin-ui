<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            :title="$routeMeta.$label($route)"
            table-id="emergencymappingcontainers"
            resource="emergencymappingcontainers"
            resource-type="api"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-singular="$t('Emergency Mapping Container')"
            :columns="columns"
            :searchable="true"
            :addable="true"
            :add-action-routes="[{ name: 'emergencyMappingContainerCreation' }]"
            :editable="true"
            :deletable="true"
            deletion-subject="name"
            :show-header="false"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-mx-xs"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    :disable="$waitPage($wait)"
                    :to="{ name: 'emergencyMappingContainerDownload'}"
                />
                <aui-list-action
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'emergencyMappingContainerUpload'}"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiEmergencyMappingContainerList',
    components: {
        AuiListAction,
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                this.getExpandedResellerNameColumn(),
                this.getNameColumn()
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'emergencyMappingContainerEdit',
                'emergencyMappingList'
            ]
        }
    }
}
</script>
