import { Notify, copyToClipboard } from 'quasar'
import { i18n } from 'boot/i18n'

export function showGlobalSuccessMessage (message) {
    return Notify.create({
        type: 'positive',
        position: 'top',
        message
    })
}

export function showGlobalErrorMessage (messageOrException, options) {
    let errorMessage = messageOrException
    if (typeof messageOrException === 'object') {
        // trying to get error message from the Axios response otherwise from the error itself
        errorMessage = messageOrException?.response?.data?.message || messageOrException?.message
    }
    if (errorMessage === '' || errorMessage === undefined || errorMessage === null) {
        errorMessage = i18n.t('Unknown error')
    }
    return Notify.create({
        type: 'negative',
        position: 'top',
        message: errorMessage,
        ...(options || {
            timeout: 10000,
            actions: [
                getStandardNotifyAction('copyToClipboard', {
                    data: () => {
                        /* To prevent the disclosure of any possible personal info we are copying just an error
                           message visible on the screen, but not entire exception data or network request data,
                           because such data might contains login\password or similar information */
                        return errorMessage + ' (' + new Date() + ')'
                    }
                }),
                getStandardNotifyAction('close')
            ],
            multiLine: false
        })
    })
}

export function getStandardNotifyAction (type, options = {}) {
    const actions = {
        close: {
            icon: 'highlight_off',
            color: 'white',
            size: 'md',
            padding: 'xs' // Note: more details about magic props can be found inside "wrapperStyle" func from "quasar/src/mixins/btn.js" framework source-file
        },
        copyToClipboard: {
            icon: 'content_copy',
            color: 'white',
            handler: () => {
                const copyData = (typeof options.data === 'function') ? options.data() : options.data
                copyToClipboard(copyData)
                    .then(() => {
                        showGlobalSuccessMessage(i18n.t('Data is in the clipboard'))
                    })
                    .catch(() => {
                        console.error(copyData)
                        showGlobalErrorMessage(i18n.t('Unable to copy data to clipboard'))
                    })
            },
            size: 'sm',
            padding: 'sm'
        }
    }
    return { ...actions[type] }
}
