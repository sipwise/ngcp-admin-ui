
import {
	LocalStorage
} from 'quasar'

export function setLocal (name, value) {
	LocalStorage.set('aui_' + name, value)
}

export function getLocal (name) {
	return LocalStorage.getItem('aui_' + name)
}

export function deleteLocal (name) {
	LocalStorage.remove('aui_' + name)
}
