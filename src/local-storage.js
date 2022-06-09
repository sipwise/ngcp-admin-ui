
import {
    LocalStorage,
    SessionStorage
} from 'quasar'

const VARIABLE_PREFIX = 'aui_'

export function setLocal (name, value) {
    LocalStorage.set(VARIABLE_PREFIX + name, value)
}

export function getLocal (name) {
    return LocalStorage.getItem(VARIABLE_PREFIX + name)
}

export function deleteLocal (name) {
    LocalStorage.remove(VARIABLE_PREFIX + name)
}

export function setSessionStorage (name, value) {
    SessionStorage.set(VARIABLE_PREFIX + name, value)
}

export function getSessionStorage (name) {
    return SessionStorage.getItem(VARIABLE_PREFIX + name)
}

export function delSessionStorage (name) {
    SessionStorage.remove(VARIABLE_PREFIX + name)
}
