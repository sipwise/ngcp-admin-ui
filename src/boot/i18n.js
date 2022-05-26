import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages, { defaultLocale, getLanguageFromV1, setLanguage, pluralizationRules } from 'src/i18n'
import {
    getLocal
} from 'src/local-storage'

Vue.use(VueI18n)

const currentLocale = getLanguageFromV1() || getLocal('language') || defaultLocale

export const i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    formatFallbackMessages: true,
    messages,
    pluralizationRules
})

;(async () => await setLanguage(currentLocale))()

export default ({ app }) => {
    app.i18n = i18n
}
