import { Quasar } from 'quasar'
import { setLocal } from 'src/storage'
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
