<template>
    <aui-base-sub-context>
        <div class="row items-center q-col-gutter-sm q-mb-md">
            <div class="col-auto">
                <q-toggle
                    v-model="considerPorts"
                    :label="$t('Consider Ports')"
                />
            </div>
            <div class="col-auto">
                <q-btn
                    color="primary"
                    icon="fas fa-file-download"
                    :label="$t('Download PCAP')"
                    :disable="isLoading || frames.length === 0"
                    @click="downloadPcap"
                />
            </div>
            <div class="col-auto">
                <q-btn
                    color="primary"
                    icon="edit"
                    :label="$t('Node Editor')"
                    @click="showNodeEditor = !showNodeEditor"
                />
            </div>
        </div>

        <q-banner
            v-if="loadError"
            class="bg-negative text-white q-mb-md"
        >
            {{ $t('Failed to load the call flow for this call.') }}
        </q-banner>

        <q-banner
            v-if="legErrors.length > 0"
            class="bg-negative text-white q-mb-md"
        >
            {{ $t('Some captured packets for this call could not be loaded or parsed and may be missing from the diagram.') }}
        </q-banner>

        <q-banner
            v-if="skippedPacketCount > 0"
            class="bg-warning text-white q-mb-md"
        >
            {{ $t('{count} captured packets could not be parsed and are not shown.', { count: skippedPacketCount }) }}
        </q-banner>

        <aui-call-flow-node-editor
            v-if="showNodeEditor"
            v-model:aliases="aliases"
            :nodes="nodes"
            :auto-labels="autoLabels"
            class="q-mb-md"
        />

        <q-inner-loading :showing="isLoading" />

        <div
            v-if="!isLoading && !loadError && frames.length === 0"
            class="text-grey-7"
        >
            {{ $t('No captured packets found for this call.') }}
        </div>

        <aui-call-flow-diagram
            v-else-if="!isLoading"
            :frames="frames"
            :aliases="aliases"
            :auto-labels="autoLabels"
            :consider-ports="considerPorts"
            @packet-select="selectedFrame = $event"
        />

        <aui-call-flow-packet-detail
            :frame="selectedFrame"
            class="q-mt-md"
        />
    </aui-base-sub-context>
</template>

<script setup>
import AuiCallFlowDiagram from 'components/callFlow/AuiCallFlowDiagram'
import AuiCallFlowNodeEditor from 'components/callFlow/AuiCallFlowNodeEditor'
import AuiCallFlowPacketDetail from 'components/callFlow/AuiCallFlowPacketDetail'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { useCallFlow } from 'src/composables/useCallFlow'
import { decodeCallId } from 'src/helpers/callFlow'
import { callFlowNodeKey, computeCallFlowRoleLabels } from 'src/lib/callFlow/callFlowFrames'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const callFlow = useCallFlow()

const considerPorts = ref(true)
const showNodeEditor = ref(false)
const aliases = ref({})
const selectedFrame = ref(null)
const isLoading = ref(false)
const loadError = ref(null)

const { frames, skippedPacketCount, legErrors, callFlowRoles } = callFlow
const nodes = callFlow.nodes(considerPorts)
const autoLabels = computed(() => computeCallFlowRoleLabels(callFlowRoles.value, { considerPorts: considerPorts.value }))

watch(
    () => route.params.callId,
    async (callId) => {
        selectedFrame.value = null
        aliases.value = {}
        isLoading.value = true
        loadError.value = null
        try {
            await callFlow.load(decodeCallId(callId))
        } catch (error) {
            loadError.value = error
        } finally {
            isLoading.value = false
        }
    },
    { immediate: true }
)

// Node aliases are keyed by "ip:port" or bare "ip" depending on considerPorts -
// remap them to the new keys when the toggle flips
watch(considerPorts, (newValue, oldValue) => {
    const remapped = {}
    frames.value.forEach((frame) => {
        [[frame.src_ip, frame.src_port], [frame.dst_ip, frame.dst_port]].forEach(([ip, port]) => {
            const oldKey = callFlowNodeKey(ip, port, { considerPorts: oldValue })
            const newKey = callFlowNodeKey(ip, port, { considerPorts: newValue })
            if (aliases.value[oldKey] !== undefined && remapped[newKey] === undefined) {
                remapped[newKey] = aliases.value[oldKey]
            }
        })
    })
    aliases.value = remapped
})

const downloadPcap = () => {
    callFlow.downloadPcap()
}
</script>
