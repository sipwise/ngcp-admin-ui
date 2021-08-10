import { Quasar, Cookies } from 'quasar'
import { setLocal } from 'src/local-storage'
import { i18n } from 'boot/i18n'

import enUs from './en.json'
import de from './de.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ru from './ru.json'

export default {
    'en-us': patchKeysForFallback(enUs),
    de: patchKeysForFallback(de),
    es: patchKeysForFallback(es),
    fr: patchKeysForFallback(fr),
    it: patchKeysForFallback(it),
    ru: patchKeysForFallback(ru)
}

export function setLanguage (lang) {
    setLocal('language', lang)
    i18n.locale = lang

    import(
        /* webpackInclude: /(en-us|de|es|fr|it|ru)\.js$/ */
        'quasar/lang/' + lang
    ).then(lang => {
        Quasar.lang.set(lang.default)
    })

    // deliver text translation into CSS
    const root = document.documentElement
    root.style.setProperty('--aui-required-mark-text-i18n', '"' + i18n.t(' (mandatory field)') + '"')

    storeLanguageV1(lang)
}

/**
 * It converts language code from V2 (new AUI) to V1 UI (old Panel) format
 * @param {string} lang
 * @returns {string}
 */
export function convertLangV2toV1 (lang) {
    return lang === 'en-us' ? 'en' : lang
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
