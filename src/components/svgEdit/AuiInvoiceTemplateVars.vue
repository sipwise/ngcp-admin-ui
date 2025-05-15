<template>
    <q-card
        flat
        bordered
        class="column no-wrap"
    >
        <q-tabs
            v-model="tab"
            dense
            align="justify"
            active-color="primary"
        >
            <q-tab
                name="vars"
                :label="$t('Variables')"
                data-cy="tab-template-vars"
            />
            <q-tab
                name="markers"
                :label="$t('Layout markers')"
                data-cy="tab-template-markers"
            />
        </q-tabs>
        <q-separator />
        <q-list
            v-if="tab === 'markers'"
            dense
            separator
            class="col scroll"
        >
            <q-item class="text-caption text-grey-7">
                {{ $t('Markers are xml comments: add them in the editor source view, they cannot be drawn') }}
            </q-item>
            <q-item
                v-for="item in markers"
                :key="item.marker"
            >
                <q-item-section>
                    <q-item-label>
                        <code>{{ item.marker }}</code>
                    </q-item-label>
                    <q-item-label caption>
                        {{ item.description }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <q-card-section
            v-if="tab === 'vars'"
            class="q-pb-none"
        >
            <div class="text-caption text-grey-7">
                {{ $t('Click a variable to copy it, then paste it into a text element of the template') }}
            </div>
            <q-input
                v-model="filter"
                dense
                clearable
                class="q-mt-sm"
                :label="$t('Filter')"
                data-cy="template-vars-filter"
            >
                <template #prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-card-section>
        <q-list
            v-if="tab === 'vars'"
            dense
            separator
            class="col scroll"
        >
            <q-item
                v-for="entry in filteredEntries"
                :key="entry.path"
                v-ripple
                clickable
                @click="copy(entry.expression)"
            >
                <q-item-section>
                    <q-item-label>
                        <code>{{ entry.expression }}</code>
                    </q-item-label>
                    <q-item-label
                        v-if="entry.example !== ''"
                        caption
                        lines="1"
                    >
                        {{ entry.example }}
                    </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-icon
                        name="content_copy"
                        size="xs"
                    />
                </q-item-section>
            </q-item>
            <q-item v-if="!filteredEntries.length">
                <q-item-section class="text-grey-7">
                    {{ $t('No variables found') }}
                </q-item-section>
            </q-item>
        </q-list>
    </q-card>
</template>

<script setup>
import { copyToClipboard } from 'quasar'
import { flattenInvoiceTemplateVars, getInvoiceTemplateMarkers } from 'src/helpers/invoice-templates'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiInvoiceTemplateVars' })

const props = defineProps({
    vars: {
        type: Object,
        default: null
    },
    category: {
        type: String,
        default: null
    }
})

const { t } = useI18n()

const tab = ref('vars')
const filter = ref('')

const markers = computed(() => getInvoiceTemplateMarkers(props.category))
const entries = computed(() => flattenInvoiceTemplateVars(props.vars))
const filteredEntries = computed(() => {
    const text = (filter.value || '').trim().toLowerCase()
    if (!text) {
        return entries.value
    }
    return entries.value.filter(({ path, example }) =>
        path.toLowerCase().includes(text) || example.toLowerCase().includes(text))
})

async function copy (expression) {
    try {
        await copyToClipboard(expression)
        showGlobalSuccessMessage(t('Data is in the clipboard'))
    } catch (error) {
        showGlobalErrorMessage(t('Unable to copy data to clipboard'))
    }
}
</script>
