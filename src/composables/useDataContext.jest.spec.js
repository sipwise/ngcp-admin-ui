/**
 * @jest-environment jsdom
 */
import { flushPromises } from '@vue/test-utils'
import {
    createPageModule,
    createTestStore,
    createWaitModule,
    mountComposable
} from 'src/composables/composableTestHelpers'
import { useDataContext } from 'src/composables/useDataContext'
import { ref } from 'vue'
import { createStore } from 'vuex'

describe('useDataContext', () => {
    it('loads the context automatically on mount and exposes it as `object`', async () => {
        const store = createTestStore()
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 42
        }), store)

        await flushPromises()

        expect(result.object.value).toEqual({ id: 42 })
    })

    it('tracks the WAIT_PAGE waiter while loading is in flight', async () => {
        let resolveLoad
        const loadDataContext = jest.fn(({ commit }, payload) => new Promise((resolve) => {
            resolveLoad = () => {
                commit('dataContextLoaded', { ...payload, resourceObject: { id: payload.resourceId } })
                resolve()
            }
        }))
        const store = createTestStore({ loadDataContext })
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 1
        }), store)

        await flushPromises()
        expect(result.loading.value).toBe(true)

        resolveLoad()
        await flushPromises()
        expect(result.loading.value).toBe(false)
    })

    it('calls loadDataContext with the full payload, including resourceExpand/resourceFilters/resourceRelations', async () => {
        const loadDataContext = jest.fn(async ({ commit }, payload) => {
            commit('dataContextLoaded', { ...payload, resourceObject: { id: payload.resourceId } })
        })
        const store = createTestStore({ loadDataContext })
        mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 42,
            resourceExpand: ['contact_id'],
            resourceFilters: { reseller_id: 1 },
            resourceRelations: { billing_profiles: { name: 'billingProfiles' } }
        }), store)

        await flushPromises()

        expect(loadDataContext).toHaveBeenCalledWith(expect.anything(), {
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 42,
            resourceExpand: ['contact_id'],
            resourceFilters: { reseller_id: 1 },
            resourceRelations: { billing_profiles: { name: 'billingProfiles' } }
        })
    })

    it('does not auto-load when autoLoad is false, but still reads pre-existing state', async () => {
        const loadDataContext = jest.fn()
        const store = createTestStore({ loadDataContext })
        store.commit('page/dataContextLoaded', {
            resourceObjectId: 'ncosLevelsDetailsLnpCarrierContext',
            resourceObject: { id: 7 }
        })

        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'ncosLevelsDetailsLnpCarrierContext',
            autoLoad: false
        }), store)

        await flushPromises()

        expect(loadDataContext).not.toHaveBeenCalled()
        expect(result.object.value).toEqual({ id: 7 })
    })

    it('cleans up the context on unmount', async () => {
        const store = createTestStore()
        const { wrapper, result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 42
        }), store)

        await flushPromises()
        expect(result.object.value).toEqual({ id: 42 })

        wrapper.unmount()
        expect(store.state.page.customerContext).toBeUndefined()
    })

    it('reload() re-dispatches loadDataContext for the same resourceObjectId', async () => {
        const store = createTestStore()
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 42
        }), store)

        await flushPromises()
        store.commit('page/destroyDataContext', { resourceObjectId: 'customerContext' })
        expect(result.object.value).toBeUndefined()

        await result.reload()
        expect(result.object.value).toEqual({ id: 42 })
    })

    it('tracks the WAIT_PAGE waiter while reload() is in flight', async () => {
        let resolveReload
        const reloadDataContext = jest.fn(() => new Promise((resolve) => {
            resolveReload = resolve
        }))
        const store = createStore({
            modules: {
                wait: createWaitModule(),
                page: {
                    ...createPageModule(),
                    actions: {
                        ...createPageModule().actions,
                        reloadDataContext
                    }
                }
            }
        })
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: 42
        }), store)

        await flushPromises()
        expect(result.loading.value).toBe(false)

        const reloadPromise = result.reload()
        await flushPromises()
        expect(result.loading.value).toBe(true)

        resolveReload()
        await reloadPromise
        expect(result.loading.value).toBe(false)
    })

    it('reloads for the new id when a reactive resourceId changes', async () => {
        const store = createTestStore()
        const resourceId = ref(42)
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId
        }), store)

        await flushPromises()
        expect(result.object.value).toEqual({ id: 42 })

        resourceId.value = 7
        await flushPromises()

        expect(result.object.value).toEqual({ id: 7 })
    })

    it('clears the previous object before the new one arrives, so nothing renders stale data', async () => {
        let resolveLoad
        const loadDataContext = jest.fn(({ commit }, payload) => new Promise((resolve) => {
            resolveLoad = () => {
                commit('dataContextLoaded', { ...payload, resourceObject: { id: payload.resourceId } })
                resolve()
            }
        }))
        const store = createTestStore({ loadDataContext })
        const resourceId = ref(42)
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId
        }), store)

        await flushPromises()
        resolveLoad()
        await flushPromises()
        expect(result.object.value).toEqual({ id: 42 })

        resourceId.value = 7
        await flushPromises()
        // The new request is still in flight: the old subscriber must be gone
        // rather than lingering for the subtree to render and edit.
        expect(result.object.value).toBeUndefined()

        resolveLoad()
        await flushPromises()
        expect(result.object.value).toEqual({ id: 7 })
    })

    it('recovers when a stale response for an old id resolves after the current one', async () => {
        // A FIFO queue of in-flight requests (rather than one resolver per id)
        // so a retriggered request for the same id gets its own entry instead
        // of silently reusing an already-resolved promise.
        const pending = []
        const loadDataContext = jest.fn(({ commit }, payload) => new Promise((resolve) => {
            pending.push({
                resourceId: payload.resourceId,
                resolve: () => {
                    commit('dataContextLoaded', { ...payload, resourceObject: { id: payload.resourceId } })
                    resolve()
                }
            })
        }))
        const store = createTestStore({ loadDataContext })
        const resourceId = ref(42)
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId
        }), store)

        await flushPromises()
        resourceId.value = 7
        await flushPromises()
        expect(pending.map((request) => request.resourceId)).toEqual([42, 7])

        // Resolve out of network order: the newer (id 7) request first.
        pending[1].resolve()
        await flushPromises()
        expect(result.object.value).toEqual({ id: 7 })

        // The stale id-42 response lands and overwrites the store...
        pending[0].resolve()
        await flushPromises()
        expect(result.object.value).toEqual({ id: 42 })
        // ...which the composable must detect and correct by re-fetching the
        // still-current id 7, rather than leaving id 42 standing.
        expect(pending).toHaveLength(3)
        expect(pending[2].resourceId).toBe(7)

        pending[2].resolve()
        await flushPromises()
        expect(result.object.value).toEqual({ id: 7 })
    })

    it('does not reload when the id getter re-evaluates to the same value', async () => {
        const loadDataContext = jest.fn(async ({ commit }, payload) => {
            commit('dataContextLoaded', { ...payload, resourceObject: { id: payload.resourceId } })
        })
        const store = createTestStore({ loadDataContext })
        // Stands in for `route.params` being replaced on every navigation while
        // the id inside it stays the same (e.g. switching tabs of one resource).
        const params = ref({ id: 42 })
        mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId: () => params.value.id
        }), store)

        await flushPromises()
        expect(loadDataContext).toHaveBeenCalledTimes(1)

        params.value = { id: 42 }
        await flushPromises()

        expect(loadDataContext).toHaveBeenCalledTimes(1)
    })

    it('clears but does not fetch when the id becomes nullish', async () => {
        const loadDataContext = jest.fn(async ({ commit }, payload) => {
            commit('dataContextLoaded', { ...payload, resourceObject: { id: payload.resourceId } })
        })
        const store = createTestStore({ loadDataContext })
        const resourceId = ref(42)
        const { result } = mountComposable(() => useDataContext({
            resourceObjectId: 'customerContext',
            resource: 'customers',
            resourceId
        }), store)

        await flushPromises()
        expect(loadDataContext).toHaveBeenCalledTimes(1)

        resourceId.value = undefined
        await flushPromises()

        expect(loadDataContext).toHaveBeenCalledTimes(1)
        expect(result.object.value).toBeUndefined()
    })

    it('does not throw when called outside a component setup (no active scope)', () => {
        expect(() => useDataContext({ resourceObjectId: 'standalone' })).not.toThrow()
    })
})
