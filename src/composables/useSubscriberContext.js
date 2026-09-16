import { useDataContext } from 'src/composables/useDataContext'
import { computed } from 'vue'

const RESOURCE_EXPAND = [
    'domain_id',
    'domain_id.reseller_id',
    'profile_id',
    'profile_set_id',
    'customer_id',
    'customer_id.contact_id',
    'pbx_group_ids',
    'pbx_groupmember_ids'
]

// Composition API version of the *context* half of
// mixins/data-context-pages/subscriber.js and customer-details-subscriber.js.
// Both mixins load a subscriber and compute the same related fields from it
// (customer, contact, pbx flags, etc.) — they only differ in which id/filters
// they load by. This composable takes those as parameters instead of being two
// near-identical mixins.
//
// Not covered: the number-assignment methods both mixins also pull in from
// data-context-pages/subscriber-common.js (subscriberCommonAssignNumbers,
// assignNumbersToSubscriber, unassignNumbers). A page that needs those still
// needs its own composable — see doc/composition-api.md.
export function useSubscriberContext ({ resourceObjectId = 'subscriberContext', resourceId, resourceFilters } = {}) {
    const { object: subscriber, loading, load, reload } = useDataContext({
        resourceObjectId,
        resource: 'subscribers',
        resourceId,
        resourceExpand: RESOURCE_EXPAND,
        resourceFilters
    })

    const customer = computed(() => subscriber.value?.customer_id_expand)
    const contact = computed(() => customer.value?.contact_id_expand)
    const domain = computed(() => subscriber.value?.domain_id_expand)
    const reseller = computed(() => domain.value?.reseller_id_expand)
    const profileSet = computed(() => subscriber.value?.profile_set_id_expand)
    const profile = computed(() => subscriber.value?.profile_id_expand)
    const pbxGroups = computed(() => subscriber.value?.pbx_group_ids_expand)
    const pbxGroupMembers = computed(() => subscriber.value?.pbx_groupmember_ids_expand)

    const isPbx = computed(() => customer.value?.type === 'pbxaccount')
    const isPbxPilot = computed(() => Boolean(isPbx.value && subscriber.value?.is_pbx_pilot))
    const isPbxGroup = computed(() => Boolean(isPbx.value && subscriber.value?.is_pbx_group))
    const isPbxSeat = computed(() => isPbx.value && !isPbxPilot.value && !isPbxGroup.value)
    const type = computed(() => {
        if (isPbxPilot.value) {
            return 'pbx-pilot'
        }
        if (isPbxGroup.value) {
            return 'pbx-group'
        }
        if (isPbxSeat.value) {
            return 'pbx-seat'
        }
        return 'subscriber'
    })

    return {
        subscriber,
        loading,
        load,
        reload,
        customer,
        contact,
        domain,
        reseller,
        profileSet,
        profile,
        pbxGroups,
        pbxGroupMembers,
        isPbx,
        isPbxPilot,
        isPbxGroup,
        isPbxSeat,
        type
    }
}
