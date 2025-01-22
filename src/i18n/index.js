import { Cookies, Quasar } from 'quasar'
import { setLocal } from 'src/local-storage'
import { i18n } from 'boot/i18n'

import enUs from './en.json'
import fr from './fr.json'
import de from './de.json'
import es from './es.json'
import it from './it.json'
import { showGlobalErrorMessage } from 'src/helpers/ui'

export const defaultLocale = 'en-US'
export default {
    'en-US': patchKeysForFallback(enUs),
    fr: patchKeysForFallback(fr),
    de: patchKeysForFallback(de),
    es: patchKeysForFallback(es),
    it: patchKeysForFallback(it)
}

export const pluralizationRules = {
    // Note: Slavic languages have more complex pluralization in comparison to English, so we should provide a custom
    //       pluralization function for that.
    //       A translation key's example with pluralization for "ua" lang:
    //           "Customer | Customers": "Клієнт | Клієнти | Клієнта | Клієнтів",
    ua: slavicLangPluralization
}

const loadedLanguages = [defaultLocale]
async function loadLanguageAsync (lang) {
    if (i18n.locale !== lang && !loadedLanguages.includes(lang)) {
        const language = lang === 'en-US' ? 'en' : lang
        await import(
            /* webpackChunkName: "lang-[request]" */
            `./${language}`
        ).then(
            messages => {
                i18n.global.setLocaleMessage(lang, patchKeysForFallback(messages.default))
                loadedLanguages.push(lang)
            }
        ).catch((e) => {
            console.error(e)
            i18n.global.setLocaleMessage(lang, {})
            showGlobalErrorMessage(i18n.global.t('Unable to load "{language}" language', { language }))
        })
    }
}

export async function setLanguage (lang) {
    const language = !lang || lang === 'en-us' ? 'en-US' : lang
    await loadLanguageAsync(language)
    setLocal('language', language)
    i18n.locale = language
    i18n.global.locale = language
    import(
    /* webpackInclude: /(en-US|de|es|fr|it)\.js$/ */
        'quasar/lang/' + language
    ).then(qLang => {
        Quasar.lang.set(qLang.default)
    })

    // deliver text translation into CSS
    const root = document.documentElement
    root.style.setProperty('--aui-required-mark-text-i18n', `"${i18n.global.t(' (mandatory field)')}"`)

    storeLanguageV1(language)
}

/**
 * It converts language code from V2 (new AUI) to V1 UI (old Panel) format
 * @param {string} lang
 * @returns {string}
 */
export function convertLangV2toV1 (lang) {
    return lang === 'en-US' ? 'en' : lang
}

/**
 * It converts language code from V1 (old Panel) to V2 UI (new AUI) format
 * @param {string} lang
 * @returns {string}
 */
export function convertLangV1toV2 (lang) {
    return ['en', 'i-default'].includes(lang) ? 'en-us' : lang
}

/**
 * Get currently active language code from V1 UI (old Panel)
 * @returns {string}
 */
export function getLanguageFromV1 () {
    const lang = Cookies.get('ngcp_panel_lang')
    return convertLangV1toV2(lang)
}

/**
 * set language cookie for V1 UI (old Panel). Important: it will not change the page language itself in V1
 * @param lang
 */
export function storeLanguageV1 (lang) {
    if (Cookies.has('ngcp_panel_lang')) {
        Cookies.remove('ngcp_panel_lang')
        Cookies.set('ngcp_panel_lang', convertLangV2toV1(lang), {
            expires: '60d',
            path: '/'
        })
    }
}

export function getCurrentLangAsV1Format () {
    return convertLangV2toV1(i18n.locale)
}

function patchKeysForFallback (messages = {}) {
    // Note: not translated keys may be defined as keys with empty string value. We should delete or replace such keys
    // with null or undefined value to allow VueI18n language fallback mechanism works properly
    Object.entries(messages).forEach(([key, value]) => {
        if (typeof value === 'string' && value.trim() === '') {
            messages[key] = undefined
        }
    })
    return messages
}

/**
 * @see https://kazupon.github.io/vue-i18n/guide/pluralization.html#custom-pluralization
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} an overall amount of available choices
 * @returns a final choice index to select plural word by
  */
function slavicLangPluralization (choice, choicesLength) {
    // this === VueI18n instance, so the locale property also exists here

    if (choicesLength === 1) {
        // Absent plural translations
        return 0
    } else if (choicesLength === 2) {
        // English-like translations
        return (choice === 1) ? 0 : 1
    }

    if (choice === 0) {
        return 0
    }

    const teen = choice > 10 && choice < 20
    const endsWithOne = choice % 10 === 1

    if (choicesLength < 4) {
        return (!teen && endsWithOne) ? 1 : 2
    }
    if (!teen && endsWithOne) {
        return 1
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2
    }

    return (choicesLength < 4) ? 2 : 3
}
