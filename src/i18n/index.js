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
