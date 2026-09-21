import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCallFlow () {
    const store = useStore()

    const frames = computed(() => store.state.callFlow.frames)
    const skippedPacketCount = computed(() => store.state.callFlow.skippedPacketCount)
    const legErrors = computed(() => store.state.callFlow.legErrors)
    const nodes = (considerPorts) => computed(() => store.getters['callFlow/callFlowNodes'](considerPorts.value))
    const callFlowRoles = computed(() => store.getters['user/callFlowRoles'])

    function load (callId) {
        return store.dispatch('callFlow/loadCallFlow', { callId })
    }

    function downloadPcap () {
        return store.dispatch('callFlow/downloadCallFlowPcap')
    }

    return { frames, skippedPacketCount, legErrors, nodes, callFlowRoles, load, downloadPcap }
}
