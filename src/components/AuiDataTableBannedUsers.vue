<template>
    <aui-data-table
        ref="dataTable"
        table-id="bannedusers"
        row-key="username"
        resource="bannedusers"
        resource-base-path="bannedusers"
        resource-type="ajax"
        resource-alt="security/user"
        :resource-singular="$t('User')"
        :title="$t('Banned Users')"
        :deletable="true"
        :searchable="true"
        :deletion-label="$t('Unban')"
        deletion-icon="delete_forever"
        deletion-subject="username"
        :deletion-title="'Unban {resource}'"
        :deletion-text="'You are about to unban {resource} {subject}'"
        :columns="columns"
        :use-client-side-filtering-and-pagination="true"
        v-bind="$attrs"
        @rows-selected="rowsSelected"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiDataTableBannedUsers',
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
    },
    methods: {
        rowsSelected (rows) {
            this.selectedRows = rows
        }
    }
}
</script>
