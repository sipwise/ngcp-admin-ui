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
                {{ t('Failed to load the B-Number set.') }}
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
                        {{ t('is regex') }}: {{ bnumberSet?.is_regex ? t('Yes') : t('No') }}
                    </q-chip>
                </div>
                <q-list
                    dense
                    separator
                >
                    <q-item
                        v-for="(bnumber, index) in bnumbers"
                        :key="index"
                    >
                        <q-item-section>
                            {{ bnumber.bnumber }}
                        </q-item-section>
                    </q-item>
                    <q-item v-if="bnumbers.length === 0">
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

defineOptions({ name: 'AuiCallForwardingBNumbersDialog' })

const props = defineProps({
    subscriberId: {
        type: Number,
        required: true
    },
    bnumbersetId: {
        type: Number,
        required: true
    },
    bnumbersetName: {
        type: String,
        default: ''
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

const { t } = useI18n()
const { load } = useCallForwardingSet('cfbnumbersets')

const editRoute = computed(() => ({
    name: 'subscriberDetailsCallForwardingBNumberSetEdit',
    params: {
        id: props.subscriberId,
        bnumbersetId: props.bnumbersetId
    }
}))

const loading = ref(true)
const loadError = ref(null)
const bnumberSet = ref(null)
const bnumbers = computed(() => bnumberSet.value?.bnumbers || [])
const modeLabel = computed(() => getModeLabel(bnumberSet.value?.mode))

const title = computed(() => props.bnumbersetName || t('B-Numbers'))

onMounted(async () => {
    loading.value = true
    loadError.value = null
    try {
        bnumberSet.value = await load(props.bnumbersetId)
    } catch (error) {
        loadError.value = error
    } finally {
        loading.value = false
    }
})
</script>
