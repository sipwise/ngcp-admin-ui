import { computed } from 'vue'
import { useStore } from 'vuex'

export function useUser () {
    const store = useStore()

    const isReseller = computed(() => store.getters['user/isReseller'])

    return { isReseller }
}
