<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedips"
        row-key="ip"
        resource="bannedips"
        resource-base-path="bannedips"
        resource-type="ajax"
        resource-alt="security/ip"
        :resource-singular="$t('Ip')"
        :title="$t('Banned IPs')"
        :columns="columns"
        :deletable="true"
        :searchable="true"
        :deletion-label="$t('Unban')"
        deletion-icon="delete_forever"
        deletion-subject="ip"
        :deletion-title="'Unban {resource}'"
        :deletion-text="'You are about to unban {resource} {subject}'"
        :use-client-side-filtering-and-pagination="true"
        v-bind="$attrs"
        @rows-selected="rowsSelected"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiDataTableBannedIps',
    components: {
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        columns () {
            return [
                {
                    name: 'ip',
                    field: 'ip',
                    label: this.$t('Ip'),
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                }
            ]
        }
    },
    methods: {
        rowsSelected (rows) {
            this.selectedRows = rows
        }
    }
}
</script>
