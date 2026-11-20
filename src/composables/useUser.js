import { computed } from 'vue'
import { useStore } from 'vuex'

export function useUser () {
    const store = useStore()

    const isReseller = computed(() => store.getters['user/isReseller'])

    const isCustomerCare = computed(() => store.getters['user/isCustomerCare'])

    const user = computed(() => store.state.user.user)

    return {
        isCustomerCare,
        isReseller,
        user
    }
}
