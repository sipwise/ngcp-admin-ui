<template>
    <aui-base-sub-context>
        <aui-data-table
            :key="`${route.params.id}-${profileType}`"
            :table-id="`package-${profileType}-profiles`"
            resource="profilepackages"
            :resource-path="`profilepackages/${route.params.id}`"
            resource-type="api"
            :resource-default-filters="{ expand: `${profileType}_profiles` }"
            :resource-singular="t('Billing Profile')"
            data-request-action="billing/requestPackageProfiles"
            :use-client-side-filtering-and-pagination="true"
            title=""
            :columns="columns"
            :searchable="true"
            :search-criteria-config="[
                {
                    criteria: 'profile_name',
                    label: t('Billing Profile'),
                    component: 'input'
                },
                {
                    criteria: 'network_name',
                    label: t('Billing Network'),
                    component: 'input'
                }
            ]"
            :show-header="false"
            selection="none"
        />
    </aui-base-sub-context>
</template>

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiProfilePackagesDetailsProfiles' })
defineProps({
    profileType: {
        type: String,
        required: true,
        validator: (value) => ['initial', 'topup', 'underrun'].includes(value)
    }
})

const { t } = useI18n()
const route = useRoute()
const columns = computed(() => [
    {
        name: 'profile_name',
        label: t('Billing Profile'),
        field: 'profile_name',
        sortable: true,
        align: 'left'
    },
    {
        name: 'network_name',
        label: t('Billing Network'),
        field: 'network_name',
        sortable: true,
        align: 'left'
    }
])
</script>
