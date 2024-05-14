import VueJsonPretty from 'vue-json-pretty'

export default async ({ app }) => {
    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('vue-json-pretty', VueJsonPretty)
}
