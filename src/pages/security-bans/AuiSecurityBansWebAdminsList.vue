<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedadmins"
        row-key="id"
        resource="bannedadmins"
        resource-type="api"
        resource-path="bans/admins"
        :use-api-v2="true"
        :resource-singular="$t('Web Admins')"
        :title="$t('Banned Web Admins')"
        :columns="columns"
        :searchable="true"
        :editable="false"
        :addable="false"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Unban')"
        deletion-subject="username"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'

export default {
    name: 'AuiSecurityBansWebAdminsList',
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
                    name: 'username',
                    label: this.$t('Username'),
                    field: 'username',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
