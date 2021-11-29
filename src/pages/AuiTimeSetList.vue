<template>
    <aui-base-list-page>
        <aui-data-table
            :title="$t('Timesets')"
            table-id="timesets"
            resource="timesets"
            resource-type="api"
            resource-search-field="name"
            :resource-singular="$t('Timeset')"
            :show-header="false"
            :columns="columns"
            :addable="true"
            :editable="true"
            :deletable="true"
            deletion-subject="name"
            :add-action-routes="[{ name: 'timeSetCreation' }]"
            :row-menu-route-names="[
                'timeSetEdit',
                'timeSetEvents'
            ]"
        />
    </aui-base-list-page>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiTimeSetList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
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
    }
}
</script>
