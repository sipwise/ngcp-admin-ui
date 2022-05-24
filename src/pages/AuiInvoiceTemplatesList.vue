<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="invoicetemplates"
            row-key="id"
            resource="invoicetemplates"
            resource-base-path="invoicetemplates"
            resource-type="api"
            :resource-singular="$t('Invoice Templates')"
            :title="$t('Invoice Templates')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'invoiceTemplateCreation'}
            ]"
            :deletable="true"
            :row-actions="rowActions"
            deletion-subject="id"
            :show-header="false"
            :resource-search-field="name"
            :resource-search-wildcard="true"
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
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiInvoiceTemplatesList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subContext
    ],
    data () {
        return {
            name: null
        }
    },
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    ...this.expandedResellerNameColumn,
                    editable: false
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'invoiceTemplateEditContent',
                'invoiceTemplateEditInfo'
            ]
        }
    }
}
</script>
