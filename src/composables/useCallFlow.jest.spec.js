/**
 * @jest-environment jsdom
 */
import { mountComposable } from 'src/composables/composableTestHelpers'
import { useCallFlow } from 'src/composables/useCallFlow'
import { ref } from 'vue'
import { createStore } from 'vuex'

// Minimal stand-in for src/store/callFlow's state/getters/actions — only the
// contract useCallFlow() relies on.
function createCallFlowModule ({ loadCallFlow, downloadCallFlowPcap } = {}) {
    return {
        namespaced: true,
        state: () => ({
            frames: [],
            skippedPacketCount: 0,
            legErrors: []
        }),
        getters: {
            callFlowNodes: (state) => (considerPorts = true) => {
                const nodes = []
                state.frames.forEach((frame) => {
                    const src = considerPorts ? `${frame.src_ip}:${frame.src_port}` : frame.src_ip
                    const dst = considerPorts ? `${frame.dst_ip}:${frame.dst_port}` : frame.dst_ip
                    ;[src, dst].forEach((node) => {
                        if (!nodes.includes(node)) {
                            nodes.push(node)
                        }
                    })
                })
                return nodes
            }
        },
        mutations: {
            setFrames (state, frames) {
                state.frames = frames
            },
            setSkippedPacketCount (state, count) {
                state.skippedPacketCount = count
            },
            setLegErrors (state, legErrors) {
                state.legErrors = legErrors
            }
        },
        actions: {
            loadCallFlow: loadCallFlow ?? jest.fn(),
            downloadCallFlowPcap: downloadCallFlowPcap ?? jest.fn()
        }
    }
}

// Minimal stand-in for src/store/user's callFlowRoles getter.
function createUserModule ({ callFlowRoles } = {}) {
    return {
        namespaced: true,
        getters: {
            callFlowRoles: () => callFlowRoles ?? {}
        }
    }
}

function createTestStore ({ callFlow, user } = {}) {
    return createStore({
        modules: {
            callFlow: createCallFlowModule(callFlow),
            user: createUserModule(user)
        }
    })
}

describe('useCallFlow', () => {
    it('exposes frames/skippedPacketCount/legErrors from the callFlow module', () => {
        const store = createTestStore()
        store.commit('callFlow/setFrames', [
            { src_ip: '1.1.1.1', src_port: 5060, dst_ip: '2.2.2.2', dst_port: 5060 }
        ])
        store.commit('callFlow/setSkippedPacketCount', 3)
        store.commit('callFlow/setLegErrors', [{ leg: 'b2b', message: 'boom' }])

        const { result } = mountComposable(useCallFlow, store)

        expect(result.frames.value).toHaveLength(1)
        expect(result.skippedPacketCount.value).toBe(3)
        expect(result.legErrors.value).toEqual([{ leg: 'b2b', message: 'boom' }])
    })

    it('nodes() reads callFlow/callFlowNodes, reacting to the given considerPorts ref', () => {
        const store = createTestStore()
        store.commit('callFlow/setFrames', [
            { src_ip: '1.1.1.1', src_port: 5060, dst_ip: '2.2.2.2', dst_port: 5060 }
        ])

        const { result } = mountComposable(useCallFlow, store)
        const considerPorts = ref(true)
        const nodes = result.nodes(considerPorts)

        expect(nodes.value).toEqual(['1.1.1.1:5060', '2.2.2.2:5060'])

        considerPorts.value = false
        expect(nodes.value).toEqual(['1.1.1.1', '2.2.2.2'])
    })

    it('exposes callFlowRoles from the user module', () => {
        const store = createTestStore({ user: { callFlowRoles: { caller: '1.1.1.1' } } })
        const { result } = mountComposable(useCallFlow, store)

        expect(result.callFlowRoles.value).toEqual({ caller: '1.1.1.1' })
    })

    it('load() dispatches callFlow/loadCallFlow with the given callId', () => {
        const loadCallFlow = jest.fn()
        const store = createTestStore({ callFlow: { loadCallFlow } })
        const { result } = mountComposable(useCallFlow, store)

        result.load('call-1')

        expect(loadCallFlow).toHaveBeenCalledWith(expect.anything(), { callId: 'call-1' })
    })

    it('downloadPcap() dispatches callFlow/downloadCallFlowPcap', () => {
        const downloadCallFlowPcap = jest.fn()
        const store = createTestStore({ callFlow: { downloadCallFlowPcap } })
        const { result } = mountComposable(useCallFlow, store)

        result.downloadPcap()

        expect(downloadCallFlowPcap).toHaveBeenCalled()
    })
})
