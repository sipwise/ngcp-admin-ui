<template>
    <q-field
        :model-value="modelValue"
        :label="label"
        :error="error"
        :error-message="errorMessage"
        :disable="disable"
        stack-label
        borderless
        class="aui-yaml-editor"
    >
        <template #control>
            <codemirror
                v-model="innerValue"
                class="aui-yaml-editor-codemirror fit"
                :style="{ height: '300px' }"
                :placeholder="placeholder"
                :disabled="disable"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="extensions"
                :data-cy="dataCy"
                @blur="emit('blur')"
            />
        </template>
    </q-field>
</template>

<script setup>
import { yaml } from '@codemirror/lang-yaml'
import { lintGutter, linter } from '@codemirror/lint'
import yamlParser from 'js-yaml'
import { computed } from 'vue'
import { Codemirror } from 'vue-codemirror'

defineOptions({ name: 'AuiYamlEditor' })

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: ''
    },
    disable: {
        type: Boolean,
        default: false
    },
    error: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String,
        default: null
    },
    dataCy: {
        type: String,
        default: undefined
    }
})

const emit = defineEmits(['update:modelValue', 'blur'])

function yamlLinter (view) {
    const doc = view.state.doc
    try {
        yamlParser.load(doc.toString())
        return []
    } catch (e) {
        const mark = e.mark
        const from = mark ? Math.min(mark.position, doc.length) : 0
        const line = doc.lineAt(from)
        return [{
            from: line.from,
            to: line.to,
            severity: 'error',
            message: e.reason || e.message
        }]
    }
}

const extensions = [yaml(), lintGutter(), linter(yamlLinter, { delay: 300 })]

const innerValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})
</script>

<style lang="sass" rel="stylesheet/sass">
.aui-yaml-editor
    .cm-editor
        border: 1px solid rgba(0, 0, 0, 0.24)
        border-radius: 4px
        height: 100%
</style>
