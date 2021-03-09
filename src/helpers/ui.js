import { Notify } from 'quasar'
import { i18n } from 'boot/i18n'

export function showGlobalSuccessMessage (message) {
    return Notify.create({
        type: 'positive',
        position: 'top',
        message
    })
}

export function showGlobalErrorMessage (messageOrException) {
    let errorMessage = messageOrException
    if (typeof messageOrException === 'object') {
        // trying to get error message from the Axios response otherwise from the error itself
        errorMessage = messageOrException?.response?.data?.message || messageOrException?.message
    }
    if (errorMessage === '' || errorMessage === undefined || errorMessage === null) {
        errorMessage = i18n.$t('Unknown error')
    }
    return Notify.create({
        type: 'negative',
        position: 'top',
        message: errorMessage
    })
}
