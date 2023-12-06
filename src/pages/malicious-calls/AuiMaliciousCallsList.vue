<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="maliciouscalls"
            row-key="id"
            resource="maliciouscalls"
            resource-base-path="maliciouscall"
            resource-type="api"
            :resource-singular="$t('Malicious Calls')"
            :title="$t('Malicious Calls')"
            :columns="columns"
            :show-header="false"
            :searchable="true"
            :deletable="true"
            :show-more-menu="true"
            :deletion-label="$t('Delete')"
            :deletion-text="'You are about to delete Malicious Calss'"
            deletion-subject="id"
            :search-criteria-config="[
                {
                    criteria: 'caller',
                    label: $t('Caller'),
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
export default {
    name: 'AuiMaliciousCallsList',
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
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    sortable: true,
                    align: 'left',
                    editable: false,
                    field: 'reseller_id_expand.name',
                    expand: 'reseller_id'
                },
                {
                    name: 'call_id',
                    label: this.$t('Call-id'),
                    field: 'call_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'caller',
                    label: this.$t('Caller'),
                    field: 'caller',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'callee',
                    label: this.$t('Callee'),
                    field: 'callee',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'started_at',
                    label: this.$t('Called at'),
                    field: 'started_at',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'duration',
                    label: this.$t('Duration'),
                    field: 'duration',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'source',
                    label: this.$t('Source'),
                    field: 'source',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'reported_at',
                    label: this.$t('Reported at'),
                    field: 'reported_at',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
