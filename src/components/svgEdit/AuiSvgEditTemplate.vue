<template>
    <div
        id="container"
        ref="editorContainer"
        class="full-width window-height"
    />
</template>

<script setup>
import { showGlobalError } from 'src/helpers/ui'
import {
    onMounted,
    ref,
    shallowRef,
    watch
} from 'vue'

defineOptions({ name: 'AuiSvgEditTemplate' })

const props = defineProps({
    initialSvgContent: {
        type: String,
        default: null
    }
})
const emit = defineEmits(['content-loaded'])

const editorContainer = ref(null)
const editor = shallowRef(null)

function loadSvgContent (svgContent) {
    if (editor.value) {
        editor.value.loadFromString(svgContent)
        emit('content-loaded')
    }
}

function getSvgContent () {
    if (editor.value?.svgCanvas) {
        return editor.value.svgCanvas.getSvgString()
    }
    return null
}

watch(() => props.initialSvgContent, (newContent) => {
    if (newContent) {
        loadSvgContent(newContent)
    }
})

watch(editor, (newEditor) => {
    if (newEditor && props.initialSvgContent) {
        loadSvgContent(props.initialSvgContent)
    }
})

onMounted(async () => {
    try {
        if (editorContainer.value) {
            const SVGEdit = await import('@svgedit/dist/editor/Editor')
            const Editor = SVGEdit.default || SVGEdit
            const svgEditor = new Editor(editorContainer.value)

            svgEditor.setConfig({
                allowInitialUserOverride: true,
                extensions: [],
                noDefaultExtensions: false,
                userExtensions: [],
                hiddenButtons: [
                    'main_button',
                    'tool_clear',
                    'tool_open',
                    'tool_save',
                    'tool_save_as',
                    'tool_import',
                    'tool_export',
                    'tool_docprops',
                    'title_panel',
                    'tool_editor_prefs',
                    'tool_editor_homepage'
                ],
                initContents: props.initialSvgContent || undefined
            })

            svgEditor.init()
            editor.value = svgEditor
        }
    } catch (error) {
        showGlobalError(error)
    }
})

defineExpose({ getSvgContent, loadSvgContent })
</script>

<style>
@import 'svgedit/dist/editor/svgedit.css';

/* On SVGEdit GitHubRepo it is mentioned that there are some inconsistencies
** in how the `hiddenButton` config is applied across different versions.
** To confirm it stays hidden consistently, we are hiding the buttons
** with CSS too.
*/
#main_button {
    display: none;
}

#tool_clear {
    display: none;
}

#tool_open {
    display: none;
}

#tool_save {
    display: none;
}

#tool_save_as {
    display: none;
}

#tool_export {
    display: none;
}

#tool_import {
    display: none;
}

#tool_docprops {
    display: none;
}

#title_panel {
    display: none;
}

#tool_editor_prefs {
    display: none;
}

#tool_editor_homepage {
    display: none;
}
</style>
