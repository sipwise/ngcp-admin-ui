<template>
    <aui-base-list-page
        acl-resource="entity.domains"
        :add-button-split="false"
        :add-button-routes="[{ name: 'domainCreation'}]"
        :row-action-split="true"
        :row-action-route-names="rowActionRouteNames"
    >
        <aui-data-table
            ref="table"
            table-id="domains"
            resource="domains"
            resource-base-path="domain"
            resource-type="ajax"
            resource-alt="domain/ajax"
            resource-singular="domain"
            resource-plural="domains"
            row-key="id"
            :title="$t('Domains')"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="true"
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
    name: 'AuiDomainsList',
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
