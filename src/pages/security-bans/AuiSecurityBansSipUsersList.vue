<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedusers"
        row-key="username"
        resource="bannedusers"
        resource-base-path="bannedusers"
        resource-type="api"
        :resource-singular="$t('User')"
        :title="$t('Banned Users')"
        :deletable="true"
        :searchable="true"
        :deletion-label="$t('Unban')"
        deletion-subject="username"
        :columns="columns"
        :show-header="false"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSecurityBansSipUsersList',
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
                    name: 'username',
                    field: 'username',
                    label: this.$t('Username'),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'auth_count',
                    field: 'auth_count',
                    label: this.$t('Fail Count'),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'last_auth',
                    field: 'last_auth',
                    label: this.$t('Last Attempt'),
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
