<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedusers"
        row-key="id"
        resource="bannedusers"
        resource-type="api"
        resource-path="bans/registrations"
        :use-api-v2="true"
        :resource-singular="$t('User')"
        :title="$t('Banned Users')"
        :deletable="true"
        :searchable="true"
        :deletion-label="$t('Unban')"
        deletion-subject="username"
        :columns="columns"
        :show-header="false"
        :clear-filter-on-change="true"
        :search-criteria-config="[
            {
                criteria: 'username',
                label: $t('Username'),
                component: 'input'
            },
            {
                criteria: 'domain',
                label: $t('Domain'),
                component: 'input'
            }
        ]"
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
                    name: 'domain',
                    field: 'domain',
                    label: this.$t('Domain'),
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
