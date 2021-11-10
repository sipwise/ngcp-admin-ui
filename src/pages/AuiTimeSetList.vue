<template>
    <aui-base-list-page
        acl-resource="entity.timesets"
        :add-button-split="false"
        :add-button-routes="[{ name: 'timeSetCreation' }]"
        :row-action-route-names="[
            'timeSetEdit',
            'timeSetEvents'
        ]"
    >
        <aui-data-table
            :title="$t('Timesets')"
            table-id="timesets"
            resource="timesets"
            resource-type="api"
            resource-search-field="name"
            :resource-singular="$t('Timeset')"
            :show-header="false"
            :columns="columns"
            :deletable="true"
            deletion-subject="name"
            :addable="true"
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
