/**
 * @jest-environment jsdom
 */
import { flushPromises } from '@vue/test-utils'
import { createTestStore, mountComposable } from 'src/composables/composableTestHelpers'
import { useSubscriberContext } from 'src/composables/useSubscriberContext'

const PBX_PILOT_SUBSCRIBER = {
    id: 1,
    is_pbx_pilot: true,
    is_pbx_group: false,
    customer_id_expand: {
        type: 'pbxaccount',
        contact_id_expand: { id: 10, email: 'pilot@example.com' }
    },
    domain_id_expand: {
        reseller_id_expand: { id: 20, name: 'reseller' }
    },
    profile_set_id_expand: { id: 30 },
    profile_id_expand: { id: 40 },
    pbx_group_ids_expand: [{ id: 50 }],
    pbx_groupmember_ids_expand: [{ id: 60 }]
}

describe('useSubscriberContext', () => {
    it('loads under resourceObjectId "subscriberContext" by default and exposes the derived fields', async () => {
        const store = createTestStore()
        const { result } = mountComposable(() => useSubscriberContext({
            resourceId: 1
        }), store)

        await flushPromises()

        store.commit('page/dataContextLoaded', {
            resourceObjectId: 'subscriberContext',
            resourceObject: PBX_PILOT_SUBSCRIBER
        })

        expect(result.subscriber.value).toEqual(PBX_PILOT_SUBSCRIBER)
        expect(result.customer.value).toEqual(PBX_PILOT_SUBSCRIBER.customer_id_expand)
        expect(result.contact.value).toEqual(PBX_PILOT_SUBSCRIBER.customer_id_expand.contact_id_expand)
        expect(result.reseller.value).toEqual(PBX_PILOT_SUBSCRIBER.domain_id_expand.reseller_id_expand)
        expect(result.profileSet.value).toEqual(PBX_PILOT_SUBSCRIBER.profile_set_id_expand)
        expect(result.profile.value).toEqual(PBX_PILOT_SUBSCRIBER.profile_id_expand)
        expect(result.pbxGroups.value).toEqual(PBX_PILOT_SUBSCRIBER.pbx_group_ids_expand)
        expect(result.pbxGroupMembers.value).toEqual(PBX_PILOT_SUBSCRIBER.pbx_groupmember_ids_expand)
    })

    it('derives isPbxPilot/isPbxGroup/isPbxSeat/type for a pbx pilot', async () => {
        const store = createTestStore()
        const { result } = mountComposable(() => useSubscriberContext({
            resourceId: 1
        }), store)

        await flushPromises()
        store.commit('page/dataContextLoaded', {
            resourceObjectId: 'subscriberContext',
            resourceObject: PBX_PILOT_SUBSCRIBER
        })

        expect(result.isPbx.value).toBe(true)
        expect(result.isPbxPilot.value).toBe(true)
        expect(result.isPbxGroup.value).toBe(false)
        expect(result.isPbxSeat.value).toBe(false)
        expect(result.type.value).toBe('pbx-pilot')
    })

    it('derives type "subscriber" for a plain, non-pbx subscriber', async () => {
        const store = createTestStore()
        const { result } = mountComposable(() => useSubscriberContext({
            resourceId: 2
        }), store)

        await flushPromises()
        store.commit('page/dataContextLoaded', {
            resourceObjectId: 'subscriberContext',
            resourceObject: { id: 2, customer_id_expand: { type: 'sipaccount' } }
        })

        expect(result.isPbx.value).toBe(false)
        expect(result.isPbxPilot.value).toBe(false)
        expect(result.isPbxSeat.value).toBe(false)
        expect(result.type.value).toBe('subscriber')
    })

    it('accepts a custom resourceObjectId so it can coexist with another loaded context', async () => {
        const store = createTestStore()
        mountComposable(() => useSubscriberContext({
            resourceObjectId: 'customerSubscriberContext',
            resourceId: 1,
            resourceFilters: { customer_id: 5 }
        }), store)

        await flushPromises()

        expect(store.state.page.subscriberContext).toBeUndefined()
        store.commit('page/dataContextLoaded', {
            resourceObjectId: 'customerSubscriberContext',
            resourceObject: PBX_PILOT_SUBSCRIBER
        })
        expect(store.state.page.customerSubscriberContext).toEqual(PBX_PILOT_SUBSCRIBER)
    })

    it('passes resourceId/resourceFilters/resourceExpand through to loadDataContext', async () => {
        const loadDataContext = jest.fn(async ({ commit }, payload) => {
            commit('dataContextLoaded', payload)
        })
        const store = createTestStore({ loadDataContext })
        mountComposable(() => useSubscriberContext({
            resourceObjectId: 'customerSubscriberContext',
            resourceId: 1,
            resourceFilters: { customer_id: 5 }
        }), store)

        await flushPromises()

        expect(loadDataContext).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                resourceObjectId: 'customerSubscriberContext',
                resource: 'subscribers',
                resourceId: 1,
                resourceFilters: { customer_id: 5 },
                resourceExpand: expect.arrayContaining(['customer_id', 'domain_id'])
            })
        )
    })
})
