import { i18n } from 'boot/i18n'
import { apiPost, apiPostMinimal, apiPutMinimal } from 'src/api/ngcpAPI'
import { markErrorAsHandled } from 'src/helpers/errorHandling'
import { capitalizeFirstLetter, getApiErrorSummary } from 'src/helpers/http-error'
import { escapeHtml, showGlobalErrorHtml } from 'src/helpers/ui'

export async function uploadCsv (context, formData) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? 'true' : 'false'
    let path = 'v2/resellers/phonebook'
    const payload = formDataPayload(formData)
    if (formData?.subscriber_id) {
        path = `v2/subscribers/${formData?.subscriber_id}/phonebook`
    } else if (formData?.customer_id) {
        path = `v2/customers/${formData?.customer_id}/phonebook`
    } else if (formData.reseller_id) {
        path = `v2/resellers/${formData?.reseller_id}/phonebook`
    }
    try {
        await apiPost({
            path: `${path}/?purge_existing=${purgeExistingValue}`,
            data: payload,
            config
        })
    } catch (err) {
        const data = err.response?.data
        if (data?.errors?.length > 0) {
            throw showCsvErrors({ ...data, message: err.apiMessage })
        }
        throw err
    }
}

function getCsvErrorLine ({ pointer, message }) {
    const row = pointer?.match(/^\/(\d+)(\/|$)/)
    return {
        label: row ? i18n.global.t('Line {line}:', { line: Number(row[1]) + 2 }) : null,
        message: capitalizeFirstLetter(message)
    }
}

function showCsvErrors (data) {
    const summary = getApiErrorSummary(data)
    const lines = [
        ...(summary ? [{ label: null, message: `${summary}:` }] : []),
        ...data.errors.map(getCsvErrorLine)
    ]
    const text = lines.map(({ label, message }) => (label ? `${label} ${message}` : message)).join('\n')
    const html = lines
        .map(({ label, message }) => (label ? `<b>${escapeHtml(label)}</b> ${escapeHtml(message)}` : escapeHtml(message)))
        .join('<br>')
    showGlobalErrorHtml(html, text)
    const error = new Error(text)
    markErrorAsHandled(error)
    return error
}

function formDataPayload (payload) {
    const formData = new FormData()
    formData.append('file', payload.file)
    return formData
}

export async function createPhonebookEntry (context, payload) {
    let path = 'v2/resellers/phonebook'
    if (payload.subscriber_id) {
        path = `v2/subscribers/${payload.subscriber_id}/phonebook`
    } else if (payload.customer_id) {
        path = `v2/customers/${payload.customer_id}/phonebook`
    } else if (payload.reseller_id) {
        path = `v2/resellers/${payload.reseller_id}/phonebook`
    }
    await apiPostMinimal({
        resource: path,
        data: payload
    })
}

export async function updatePhonebookEntry (context, payload) {
    let path = 'v2/resellers/phonebook'
    if (payload.subscriber_id) {
        path = `v2/subscribers/${payload.subscriber_id}/phonebook`
    } else if (payload.customer_id) {
        path = `v2/customers/${payload.customer_id}/phonebook`
    } else if (payload.reseller_id) {
        path = `v2/resellers/${payload.reseller_id}/phonebook`
    }
    await apiPutMinimal({
        resource: path,
        resourceId: payload.id,
        data: payload
    })
}
