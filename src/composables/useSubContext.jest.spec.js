/**
 * @jest-environment jsdom
 */
import { flushPromises } from '@vue/test-utils'
import { createWaitModule, mountComposable } from 'src/composables/composableTestHelpers'
import { useSubContext } from 'src/composables/useSubContext'
import { createStore } from 'vuex'

// Minimal stand-in for src/store/page's resourceObject/resourceRelatedObjects/
// resourceRelatedSubObjects state and its reloadContext action (see
// src/store/page/{actions,mutations}.js) — only the contract useSubContext() relies on.
function createPageModule ({ reloadContext } = {}) {
    return {
        namespaced: true,
        state: () => ({
            resourceObject: null,
            resourceRelatedObjects: null,
            resourceRelatedSubObjects: null
        }),
        mutations: {
            contextSucceeded (state, { resourceObject, resourceRelatedObjects, resourceRelatedSubObjects }) {
                state.resourceObject = resourceObject
                state.resourceRelatedObjects = resourceRelatedObjects
                state.resourceRelatedSubObjects = resourceRelatedSubObjects
            }
        },
        actions: {
            reloadContext: reloadContext ?? jest.fn(async ({ commit }) => {
                commit('contextSucceeded', { resourceObject: { id: 1 } })
            })
        }
    }
}

function createTestStore (pageModuleOptions) {
    return createStore({
        modules: {
            wait: createWaitModule(),
            page: createPageModule(pageModuleOptions)
        }
    })
}

describe('useSubContext', () => {
    it('exposes resourceObject/resourceRelatedObjects/resourceRelatedSubObjects from the `page` module', () => {
        const store = createTestStore()
        store.commit('page/contextSucceeded', {
            resourceObject: { id: 1 },
            resourceRelatedObjects: { contact: { id: 2 } },
            resourceRelatedSubObjects: { billingProfile: { id: 3 } }
        })

        const { result } = mountComposable(useSubContext, store)

        expect(result.resourceObject.value).toEqual({ id: 1 })
        expect(result.resourceRelatedObjects.value).toEqual({ contact: { id: 2 } })
        expect(result.resourceRelatedSubObjects.value).toEqual({ billingProfile: { id: 3 } })
    })

    it('reload() tracks the WAIT_PAGE waiter while dispatching page/reloadContext', async () => {
        let resolveReload
        const reloadContext = jest.fn(({ commit }) => new Promise((resolve) => {
            resolveReload = () => {
                commit('contextSucceeded', { resourceObject: { id: 42 } })
                resolve()
            }
        }))
        const store = createTestStore({ reloadContext })
        const { result } = mountComposable(useSubContext, store)

        const reloadPromise = result.reload()
        expect(result.loading.value).toBe(true)

        resolveReload()
        await reloadPromise
        await flushPromises()

        expect(result.loading.value).toBe(false)
        expect(result.resourceObject.value).toEqual({ id: 42 })
    })
})
