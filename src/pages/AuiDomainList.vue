<template>
    <aui-base-list-page>
        <aui-data-table
            ref="table"
            table-id="domains"
            resource="domains"
            resource-base-path="domain"
            resource-type="ajax"
            resource-alt="domain/ajax"
            :resource-singular="$t('Domain')"
            row-key="id"
            :title="$t('Domains')"
            :columns="columns"
            :searchable="true"
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
export default {
    name: 'AuiDomainList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'domain_resellers_reseller_name',
                    label: this.$t('Reseller'),
                    field: 'domain_resellers_reseller_name',
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
                'domainPreferences'
            ]
        }
    }
}
</script>
