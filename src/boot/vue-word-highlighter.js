import WordHighlighter from 'vue-word-highlighter'

export default async ({ app }) => {
    app.component('text-highlight', WordHighlighter)
}
