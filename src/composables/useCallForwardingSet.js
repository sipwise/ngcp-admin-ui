import { useStore } from 'vuex'

export function useCallForwardingSet (resource) {
    const store = useStore()

    function load (id) {
        return store.dispatch('subscribers/loadCfSet', { resource, id })
    }

    return { load }
}
