import messages, {
    defaultLocale, getLanguageFromV1, pluralizationRules, setLanguage
} from 'src/i18n'
import { getLocal } from 'src/local-storage'
import { createI18n } from 'vue-i18n'

const currentLocale = getLanguageFromV1() || getLocal('language') || defaultLocale

export const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    formatFallbackMessages: true,
    messages,
    pluralizationRules
})

;(async () => await setLanguage(currentLocale))()

export default ({ app }) => {
    app.use(i18n)
    app.i18n = i18n
}
