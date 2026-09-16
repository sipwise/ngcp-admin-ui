import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { createStore } from 'vuex'

// Minimal stand-in for the `wait` Vuex module vue-wait registers when
// `useVuex: true` (see src/boot/vue-wait.js) — only the getters/actions
// the composables under test actually depend on.
export function createWaitModule () {
    return {
        namespaced: true,
        state: () => ({ waitingFor: [] }),
        getters: {
            is: (state) => (waiter) => state.waitingFor.includes(waiter),
            any: (state) => state.waitingFor.length > 0
        },
        mutations: {
            START (state, waiter) {
                state.waitingFor.push(waiter)
            },
            END (state, waiter) {
                state.waitingFor = state.waitingFor.filter((entry) => entry !== waiter)
            }
        },
        actions: {
            start ({ commit }, waiter) {
                commit('START', waiter)
            },
            end ({ commit }, waiter) {
                commit('END', waiter)
            }
        }
    }
}

// Minimal stand-in for src/store/page's loadDataContext/reloadDataContext/destroyDataContext
export function createPageModule ({ loadDataContext } = {}) {
    return {
        namespaced: true,
        state: () => ({}),
        mutations: {
            dataContextLoaded (state, { resourceObjectId, resourceObject, ...rest }) {
                state[resourceObjectId] = resourceObject
                state[`${resourceObjectId}_Resource`] = rest.resource
                state[`${resourceObjectId}_ResourceId`] = rest.resourceId
                state[`${resourceObjectId}_ResourceExpand`] = rest.resourceExpand
                state[`${resourceObjectId}_ResourceFilters`] = rest.resourceFilters
            },
            destroyDataContext (state, { resourceObjectId }) {
                delete state[resourceObjectId]
            }
        },
        actions: {
            loadDataContext: loadDataContext ?? jest.fn(async ({ commit }, payload) => {
                commit('dataContextLoaded', {
                    ...payload,
                    resourceObject: { id: payload.resourceId }
                })
            }),
            reloadDataContext: jest.fn(async ({ dispatch, state }, resourceObjectId) => {
                await dispatch('loadDataContext', {
                    resourceObjectId,
                    resource: state[`${resourceObjectId}_Resource`],
                    resourceId: state[`${resourceObjectId}_ResourceId`],
                    resourceExpand: state[`${resourceObjectId}_ResourceExpand`],
                    resourceFilters: state[`${resourceObjectId}_ResourceFilters`]
                })
            }),
            destroyDataContext ({ commit }, { resourceObjectId }) {
                commit('destroyDataContext', { resourceObjectId })
            }
        }
    }
}

export function createTestStore (pageModuleOptions) {
    return createStore({
        modules: {
            wait: createWaitModule(),
            page: createPageModule(pageModuleOptions)
        }
    })
}

export function mountComposable (composable, store) {
    let result
    const TestComponent = defineComponent({
        setup () {
            result = composable()
            return () => h('div')
        }
    })
    const wrapper = mount(TestComponent, { global: { plugins: [store] } })
    return { wrapper, result }
}
