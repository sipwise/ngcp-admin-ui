<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedips"
        row-key="id"
        resource="bannedips"
        resource-type="api"
        resource-path="bans/ips"
        :use-api-v2="true"
        :resource-singular="$t('Ip')"
        :title="$t('Banned SIP IPs')"
        :columns="columns"
        :deletable="true"
        :searchable="true"
        :deletion-label="$t('Unban')"
        deletion-subject="ip"
        :show-header="false"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSecurityBansSipIpsList',
    components: {
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
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
    }
}
</script>
