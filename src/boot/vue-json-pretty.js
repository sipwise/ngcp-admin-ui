import VueJsonPretty from 'vue-json-pretty'

export default async ({ app }) => {
    app.component('vue-json-pretty', VueJsonPretty)
}
