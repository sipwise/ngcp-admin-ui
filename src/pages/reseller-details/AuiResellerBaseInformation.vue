<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="resourceObject"
            :columns="columns"
            :rows="[{
                id: resourceObject.id,
                name: resourceObject.name,
                status: resourceObject.status
            }]"
            :row-action-route-names="[
                'resellerEdit'
            ]"
        />
    </aui-base-sub-context>
</template>
<script setup>
import AuiSingleRowTable from 'components/AuiSingleRowTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { useSubContext } from 'src/composables/useSubContext'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiResellerBaseInformation' })

const { t } = useI18n()
const { resourceObject } = useSubContext()

const columns = computed(() => [
    {
        name: 'id',
        label: t('Id')
    },
    {
        name: 'name',
        label: t('Name')
    },
    {
        name: 'status',
        label: t('Status')
    }
])
</script>
