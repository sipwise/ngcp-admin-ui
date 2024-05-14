import WordHighlighter from 'vue-word-highlighter'

export default async ({ app }) => {
    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('text-highlight', WordHighlighter)
}
