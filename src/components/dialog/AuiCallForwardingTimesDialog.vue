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
                {{ t('Failed to load the time set.') }}
            </q-p>
            <q-markup-table
                v-else-if="!loading"
                flat
                dense
            >
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th
                            v-for="(label, index) in columnLabels"
                            :key="index"
                        >
                            {{ label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(time, index) in times"
                        :key="index"
                    >
                        <td>
                            {{ index + 1 }}
                        </td>
                        <td
                            v-for="(value, columnIndex) in getTimeEntryRowValues(time)"
                            :key="columnIndex"
                        >
                            {{ value }}
                        </td>
                    </tr>
                    <tr v-if="times.length === 0">
                        <td :colspan="columnLabels.length + 1">
                            {{ t('N/A') }}
                        </td>
                    </tr>
                </tbody>
            </q-markup-table>
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
import { getTimeEntryColumnLabels, getTimeEntryRowValues } from 'src/helpers/call-forwarding'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiCallForwardingTimesDialog' })

const props = defineProps({
    subscriberId: {
        type: Number,
        required: true
    },
    timesetId: {
        type: Number,
        required: true
    },
    timesetName: {
        type: String,
        default: ''
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

const { t } = useI18n()
const { load } = useCallForwardingSet('cftimesets')

const editRoute = computed(() => ({
    name: 'subscriberDetailsCallForwardingTimeSetEdit',
    params: {
        id: props.subscriberId,
        timesetId: props.timesetId
    }
}))

const loading = ref(true)
const loadError = ref(null)
const times = ref([])

const title = computed(() => props.timesetName || t('Time Set'))
const columnLabels = computed(() => getTimeEntryColumnLabels())

onMounted(async () => {
    loading.value = true
    loadError.value = null
    try {
        const timeSet = await load(props.timesetId)
        times.value = timeSet?.times || []
    } catch (error) {
        loadError.value = error
    } finally {
        loading.value = false
    }
})
</script>
