<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="domains"
            resource="domains"
            resource-base-path="domain"
            resource-type="api"
            :resource-singular="$t('Domain')"
            row-key="id"
            :title="$t('Domains')"
            :columns="columns"
            :searchable="true"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                {
                    criteria: 'domain',
                    label: $t('Domain'),
                    component: 'input'
                }
            ]"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'domainCreation'}]"
            :deletable="true"
            :deletion-extra-confirm="{
                text: this.$t('with {0} subscribers assigned. All those subscribers WILL BE DELETED TOO! Are you sure?'),
                items: [{
                    action: 'domain/fetchDomainSubscribersCount',
                    filter: 'domain',
                    filterValue: 'domain',
                    skipCheck: (value) => String(value) === '0'
                }]
            }"
            deletion-subject="domain"
            :show-header="false"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiDomainList',
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
                {
                    name: 'reseller_id',
                    label: this.$t('Reseller'),
                    field: 'reseller_id_expand.name',
                    expand: 'reseller_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'domain',
                    label: this.$t('Domain'),
                    field: 'domain',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'domainJournal',
                'domainPreferences'
            ]
        }
    }
}
</script>
