import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import {
    getLocal
} from 'src/storage'

Vue.use(VueI18n)

export const defaultLocale = getLocal('language') || 'en-us'

export const i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    formatFallbackMessages: true,
    messages
})

export default ({ app }) => {
    app.i18n = i18n
}
