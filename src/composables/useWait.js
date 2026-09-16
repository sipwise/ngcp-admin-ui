import { computed } from 'vue'
import { useStore } from 'vuex'

export function useWait () {
    const store = useStore()

    const is = (waiter) => computed(() => store.getters['wait/is'](waiter))
    const any = computed(() => store.getters['wait/any'])
    const percent = (waiter) => computed(() => store.getters['wait/percent'](waiter))

    const start = (waiter) => store.dispatch('wait/start', waiter)
    const end = (waiter) => store.dispatch('wait/end', waiter)

    async function waitFor (waiter, action) {
        try {
            start(waiter)
            return await action()
        } finally {
            end(waiter)
        }
    }

    function waitAction (moduleName, action, waiter = action) {
        return (...args) => waitFor(waiter, () => store.dispatch(`${moduleName}/${action}`, ...args))
    }

    return { is, any, percent, start, end, waitFor, waitAction }
}
