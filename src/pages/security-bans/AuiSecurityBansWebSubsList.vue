<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedsubs"
        row-key="id"
        resource="bannedsubs"
        resource-type="api"
        resource-path="bans/subscribers"
        :use-api-v2="true"
        :resource-singular="$t('Web Subs')"
        :title="$t('Banned Web Subs')"
        :columns="columns"
        :searchable="true"
        :editable="false"
        :addable="false"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Unban')"
        deletion-subject="id"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'

export default {
    name: 'AuiSecurityBansWebSubsList',
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
