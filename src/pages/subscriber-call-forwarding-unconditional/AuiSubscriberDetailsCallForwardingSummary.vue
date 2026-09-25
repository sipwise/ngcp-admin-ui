<template>
    <aui-base-sub-context>
        <aui-data-table
            class="aui-cf-mappings-table"
            table-id="cfmappings"
            row-key="id"
            resource="cfmappings"
            :resource-path="'cfmappings/' + subscriberContextResourceId"
            :resource-singular="t('Call Forwarding')"
            resource-type="api"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :deletable="true"
            :showbutton-delete="false"
            deletion-action="subscribers/deleteCf"
            data-request-action="subscribers/requestCfMappingList"
            :show-header="false"
            :show-header-actions="false"
            :show-more-menu="canEdit"
            selection="none"
            :on-row-click-select="false"
            :use-client-side-filtering-and-pagination="true"
            :disable-pagination="true"
            :row-actions="rowActions"
            :wrap-cells="true"
        >
            <template #custom-component-timeset="{ row }">
                <template v-if="row.mappings?.length > 0">
                    <div
                        v-for="(mapping, index) in row.mappings"
                        :key="index"
                        class="ellipsis"
                    >
                        <span
                            v-if="mapping.timeset_id"
                            class="text-bold cursor-pointer aui-cf-set-link"
                            @click.stop="openTimeSetDialog(mapping)"
                        >{{ mapping.timeset }}</span>
                        <span v-else>{{ timesetLabel(mapping) }}</span>
                    </div>
                </template>
                <template v-else>
                    -
                </template>
            </template>
            <template #custom-component-sourceset="{ row }">
                <template v-if="row.mappings?.length > 0">
                    <div
                        v-for="(mapping, index) in row.mappings"
                        :key="index"
                        class="ellipsis"
                    >
                        <span
                            v-if="mapping.sourceset_id"
                            class="text-bold cursor-pointer aui-cf-set-link"
                            @click.stop="openSourceSetDialog(mapping)"
                        >{{ mapping.sourceset }}</span>
                        <span v-else>{{ sourceLabel(mapping) }}</span>
                    </div>
                </template>
                <template v-else>
                    -
                </template>
            </template>
            <template #custom-component-bnumberset="{ row }">
                <template v-if="row.mappings?.length > 0">
                    <div
                        v-for="(mapping, index) in row.mappings"
                        :key="index"
                        class="ellipsis"
                    >
                        <span
                            v-if="mapping.bnumberset_id"
                            class="text-bold cursor-pointer aui-cf-set-link"
                            @click.stop="openBNumberSetDialog(mapping)"
                        >{{ mapping.bnumberset }}</span>
                        <span v-else>{{ bNumberLabel(mapping) }}</span>
                    </div>
                </template>
                <template v-else>
                    -
                </template>
            </template>
            <template #custom-component-destinationset="{ row }">
                <template v-if="row.mappings?.length > 0">
                    <div
                        v-for="(mapping, index) in row.mappings"
                        :key="index"
                        class="ellipsis"
                    >
                        <span
                            v-if="mapping.destinationset_id"
                            class="text-bold cursor-pointer aui-cf-set-link"
                            @click.stop="openDestinationsDialog(mapping)"
                        >{{ mapping.destinationset }}</span>
                        <span v-else>{{ destinationSetLabel(mapping) }}</span>
                    </div>
                </template>
                <template v-else>
                    -
                </template>
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script setup>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { useQuasar } from 'quasar'
import { aclCan } from 'src/acl'
import AuiCallForwardingBNumbersDialog from 'src/components/dialog/AuiCallForwardingBNumbersDialog'
import AuiCallForwardingDestinationsDialog from 'src/components/dialog/AuiCallForwardingDestinationsDialog'
import AuiCallForwardingSourcesDialog from 'src/components/dialog/AuiCallForwardingSourcesDialog'
import AuiCallForwardingTimesDialog from 'src/components/dialog/AuiCallForwardingTimesDialog'
import {
    bNumberLabel,
    destinationSetLabel,
    formatEnable,
    formatPSTN,
    sourceLabel,
    timesetLabel
} from 'src/helpers/call-forwarding'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiSubscriberDetailsCallForwardingSummary' })

const { t } = useI18n()
const $q = useQuasar()
const route = useRoute()

const subscriberContextResourceId = computed(() => route.params.id)
const canEdit = computed(() => aclCan('update', 'entity.subscribers'))

const columns = computed(() => [
    {
        name: 'type',
        label: t('Type'),
        field: 'type',
        align: 'left',
        style: 'width: 14%',
        headerStyle: 'width: 14%'
    },
    {
        name: 'cft_ringtimeout',
        label: t('Answer Timeout'),
        field: 'cft_ringtimeout',
        formatter: ({ row }) => row.type === 'Timeout' ? row.cft_ringtimeout : '',
        align: 'left',
        style: 'width: 9%',
        headerStyle: 'width: 9%'
    },
    {
        name: 'timeset',
        label: t('Time Set'),
        field: 'mappings',
        editable: true,
        component: 'custom',
        align: 'left',
        style: 'width: 13%',
        headerStyle: 'width: 13%'
    },
    {
        name: 'sourceset',
        label: t('Sources'),
        field: 'mappings',
        editable: true,
        component: 'custom',
        align: 'left',
        style: 'width: 13%',
        headerStyle: 'width: 13%'
    },
    {
        name: 'bnumberset',
        label: t('To (B-Numbers)'),
        field: 'mappings',
        editable: true,
        component: 'custom',
        align: 'left',
        style: 'width: 14%',
        headerStyle: 'width: 14%'
    },
    {
        name: 'destinationset',
        label: t('Destinations'),
        field: 'mappings',
        editable: true,
        component: 'custom',
        align: 'left',
        style: 'width: 16%',
        headerStyle: 'width: 16%'
    },
    {
        name: 'enabled',
        label: t('Enabled'),
        field: 'mappings',
        formatter: ({ row }) => formatEnable(row.mappings),
        classes: 'aui-cell-multiline',
        align: 'left',
        style: 'width: 11%',
        headerStyle: 'width: 11%'
    },
    {
        name: 'use_redirection',
        label: t('Redirection'),
        field: 'mappings',
        formatter: ({ row }) => formatPSTN(row.mappings),
        classes: 'aui-cell-multiline',
        align: 'left',
        style: 'width: 10%',
        headerStyle: 'width: 10%'
    }
])

function openDestinationsDialog (mapping) {
    $q.dialog({
        component: AuiCallForwardingDestinationsDialog,
        componentProps: {
            subscriberId: Number(subscriberContextResourceId.value),
            destinationsetId: mapping.destinationset_id,
            destinationsetName: mapping.destinationset,
            canEdit: canEdit.value
        }
    })
}

function openTimeSetDialog (mapping) {
    $q.dialog({
        component: AuiCallForwardingTimesDialog,
        componentProps: {
            subscriberId: Number(subscriberContextResourceId.value),
            timesetId: mapping.timeset_id,
            timesetName: mapping.timeset,
            canEdit: canEdit.value
        }
    })
}

function openSourceSetDialog (mapping) {
    $q.dialog({
        component: AuiCallForwardingSourcesDialog,
        componentProps: {
            subscriberId: Number(subscriberContextResourceId.value),
            sourcesetId: mapping.sourceset_id,
            sourcesetName: mapping.sourceset,
            canEdit: canEdit.value
        }
    })
}

function openBNumberSetDialog (mapping) {
    $q.dialog({
        component: AuiCallForwardingBNumbersDialog,
        componentProps: {
            subscriberId: Number(subscriberContextResourceId.value),
            bnumbersetId: mapping.bnumberset_id,
            bnumbersetName: mapping.bnumberset,
            canEdit: canEdit.value
        }
    })
}

function rowActions ({ row }) {
    switch (row.type) {
        case 'Unconditional':
            return ['subscriberDetailsCallForwardingUnconditionalEdit']
        case 'Busy':
            return ['subscriberDetailsCallForwardingBusyEdit']
        case 'Timeout':
            return ['subscriberDetailsCallForwardingTimeOutEdit']
        case 'SMS':
            return ['subscriberDetailsCallForwardingSmsEdit']
        case 'Response':
            return ['subscriberDetailsCallForwardingOnResponseEdit']
        case 'Overflow':
            return ['subscriberDetailsCallForwardingOnOverflowEdit']
        case 'Unavailable':
            return ['subscriberDetailsCallForwardingUnavailableEdit']
        default:
    }
}
</script>

<style scoped lang="sass">
.aui-cf-mappings-table :deep(th),
.aui-cf-mappings-table :deep(td)
    max-width: 220px

.aui-cf-set-link:hover
    opacity: 0.6
</style>
