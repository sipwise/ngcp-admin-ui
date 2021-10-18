import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages, { getLanguageFromV1, setLanguage, pluralizationRules } from 'src/i18n'
import {
    getLocal
} from 'src/local-storage'

Vue.use(VueI18n)

export const defaultLocale = 'en-us'
const currentLocale = getLanguageFromV1() || getLocal('language') || defaultLocale

export const i18n = new VueI18n({
    locale: currentLocale,
    fallbackLocale: defaultLocale,
    formatFallbackMessages: true,
    messages,
    pluralizationRules
})

setLanguage(currentLocale)

export default ({ app }) => {
    app.i18n = i18n
}
