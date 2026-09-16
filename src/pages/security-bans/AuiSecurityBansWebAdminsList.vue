<template>
    <aui-data-table
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

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiSecurityBansWebAdminsList' })

const { t } = useI18n()

const columns = computed(() => [
    {
        name: 'id',
        label: t('ID'),
        field: 'id',
        sortable: true,
        align: 'left'
    },
    {
        name: 'username',
        label: t('Username'),
        field: 'username',
        sortable: true,
        align: 'left'
    }
])
</script>
