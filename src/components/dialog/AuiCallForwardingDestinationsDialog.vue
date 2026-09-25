<template>
    <base-dialog
        ref="dialog"
        class="aui-wide-dialog"
        title-icon="call_split"
        :title="title"
        :loading="loading"
        v-bind="$attrs"
    >
        <template #content>
            <q-p
                v-if="loadError"
                class="q-mb-md"
            >
                {{ t('Failed to load the destination set.') }}
            </q-p>
            <q-list
                v-else-if="!loading"
                dense
                separator
            >
                <q-item
                    v-for="(destination, index) in sortedDestinations"
                    :key="index"
                >
                    <q-item-section>
                        {{ formatDestinationWithTimeout(destination) }}
                    </q-item-section>
                </q-item>
                <q-item v-if="sortedDestinations.length === 0">
                    <q-item-section>
                        {{ t('N/A') }}
                    </q-item-section>
                </q-item>
            </q-list>
        </template>
        <template
            v-if="canEdit"
            #actions
        >
            <q-btn
                v-close-popup
                flat
                style="order: -1"
                icon="edit"
                :label="t('Edit')"
                color="primary"
                :to="editRoute"
            />
        </template>
    </base-dialog>
</template>

<script setup>
import BaseDialog from 'src/components/dialog/BaseDialog'
import { useCallForwardingSet } from 'src/composables/useCallForwardingSet'
import { formatDestinationWithTimeout } from 'src/helpers/call-forwarding'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiCallForwardingDestinationsDialog' })

const props = defineProps({
    subscriberId: {
        type: Number,
        required: true
    },
    destinationsetId: {
        type: Number,
        required: true
    },
    destinationsetName: {
        type: String,
        default: ''
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

const { t } = useI18n()
const { load } = useCallForwardingSet('cfdestinationsets')

const editRoute = computed(() => ({
    name: 'subscriberDetailsCallForwardingDestinationSetEdit',
    params: {
        id: props.subscriberId,
        destinationsetId: props.destinationsetId
    }
}))

const loading = ref(true)
const loadError = ref(null)
const destinations = ref([])

const title = computed(() => props.destinationsetName || t('Destinations'))
const sortedDestinations = computed(() => [...destinations.value].sort((a, b) => Number(a.priority) - Number(b.priority)))

onMounted(async () => {
    loading.value = true
    loadError.value = null
    try {
        const destinationSet = await load(props.destinationsetId)
        destinations.value = destinationSet?.destinations || []
    } catch (error) {
        loadError.value = error
    } finally {
        loading.value = false
    }
})
</script>
