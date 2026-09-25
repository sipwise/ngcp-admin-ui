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
                {{ t('Failed to load the source set.') }}
            </q-p>
            <template v-else-if="!loading">
                <div class="row q-gutter-sm q-mb-md">
                    <q-chip
                        dense
                        square
                        color="grey-3"
                        text-color="grey-9"
                    >
                        {{ t('Mode') }}: {{ modeLabel }}
                    </q-chip>
                    <q-chip
                        dense
                        square
                        color="grey-3"
                        text-color="grey-9"
                    >
                        {{ t('is regex') }}: {{ sourceSet?.is_regex ? t('Yes') : t('No') }}
                    </q-chip>
                </div>
                <q-list
                    dense
                    separator
                >
                    <q-item
                        v-for="(source, index) in sources"
                        :key="index"
                    >
                        <q-item-section>
                            {{ source.source }}
                        </q-item-section>
                    </q-item>
                    <q-item v-if="sources.length === 0">
                        <q-item-section>
                            {{ t('N/A') }}
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>
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
import { getModeLabel } from 'src/helpers/call-forwarding'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiCallForwardingSourcesDialog' })

const props = defineProps({
    subscriberId: {
        type: Number,
        required: true
    },
    sourcesetId: {
        type: Number,
        required: true
    },
    sourcesetName: {
        type: String,
        default: ''
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

const { t } = useI18n()
const { load } = useCallForwardingSet('cfsourcesets')

const editRoute = computed(() => ({
    name: 'subscriberDetailsCallForwardingSourceSetEdit',
    params: {
        id: props.subscriberId,
        sourcesetId: props.sourcesetId
    }
}))

const loading = ref(true)
const loadError = ref(null)
const sourceSet = ref(null)
const sources = computed(() => sourceSet.value?.sources || [])
const modeLabel = computed(() => getModeLabel(sourceSet.value?.mode))

const title = computed(() => props.sourcesetName || t('Sources'))

onMounted(async () => {
    loading.value = true
    loadError.value = null
    try {
        sourceSet.value = await load(props.sourcesetId)
    } catch (error) {
        loadError.value = error
    } finally {
        loading.value = false
    }
})
</script>
