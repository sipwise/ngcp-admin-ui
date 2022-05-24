<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            :title="$t('Timesets')"
            table-id="timesets"
            resource="timesets"
            resource-type="api"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-singular="$t('Timeset')"
            :show-header="false"
            :columns="columns"
            :addable="true"
            :editable="true"
            :deletable="true"
            :searchable="true"
            deletion-subject="name"
            :add-action-routes="[{ name: 'timeSetCreation' }]"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-list-page>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiTimeSetList',
    components: {
        AuiBaseListPage,
        AuiDataTable
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
                'timeSetEdit',
                'timeSetEvents'
            ]
        }
    }
}
</script>
