/**
 * @jest-environment jsdom
 */
import { createWaitModule, mountComposable } from 'src/composables/composableTestHelpers'
import { useWait } from 'src/composables/useWait'
import { createStore } from 'vuex'

describe('useWait', () => {
    let store

    beforeEach(() => {
        store = createStore({
            modules: {
                wait: createWaitModule(),
                customers: {
                    namespaced: true,
                    actions: {
                        fetchCustomer: jest.fn(async (context, id) => ({ id }))
                    }
                }
            }
        })
    })

    it('is() reflects whether the waiter is active', async () => {
        const { result } = mountComposable(useWait, store)
        expect(result.is('aui-page').value).toBe(false)

        await result.start('aui-page')
        expect(result.is('aui-page').value).toBe(true)

        await result.end('aui-page')
        expect(result.is('aui-page').value).toBe(false)
    })

    it('waitFor() starts the waiter before running the action and ends it after', async () => {
        const { result } = mountComposable(useWait, store)
        let waiterDuringAction = null

        await result.waitFor('aui-page', () => {
            waiterDuringAction = result.is('aui-page').value
            return Promise.resolve('done')
        })

        expect(waiterDuringAction).toBe(true)
        expect(result.is('aui-page').value).toBe(false)
    })

    it('waitFor() still ends the waiter when the action throws', async () => {
        const { result } = mountComposable(useWait, store)

        await expect(result.waitFor('aui-page', () => {
            throw new Error('boom')
        })).rejects.toThrow('boom')

        expect(result.is('aui-page').value).toBe(false)
    })

    it('waitAction() dispatches into the given module and wraps it with start/end', async () => {
        const { result } = mountComposable(useWait, store)
        const fetchCustomer = result.waitAction('customers', 'fetchCustomer', 'aui-page')

        const promise = fetchCustomer(42)
        expect(result.is('aui-page').value).toBe(true)

        const customer = await promise
        expect(customer).toEqual({ id: 42 })
        expect(result.is('aui-page').value).toBe(false)
    })

    it('waitAction() defaults the waiter name to the action name', async () => {
        const { result } = mountComposable(useWait, store)
        const fetchCustomer = result.waitAction('customers', 'fetchCustomer')

        await fetchCustomer(1)
        expect(result.is('fetchCustomer').value).toBe(false)
    })
})
