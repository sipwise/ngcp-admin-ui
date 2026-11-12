jest.mock('boot/i18n', () => ({
    i18n: {
        global: {
            t: (key, params = {}) => key.replace(/\{(\w+)\}/g, (match, name) => params[name])
        }
    }
}))

import { handleRequestError } from 'src/api/common'
import { apiPost } from 'src/api/ngcpAPI'
import { isErrorNotHandled } from 'src/helpers/errorHandling'
import { showGlobalErrorHtml } from 'src/helpers/ui'
import { uploadCsv } from 'src/store/phonebookEntries/actions'

jest.mock('src/api/ngcpAPI', () => ({
    apiPost: jest.fn(),
    apiPostMinimal: jest.fn(),
    apiPutMinimal: jest.fn()
}))
jest.mock('src/helpers/ui', () => ({
    ...jest.requireActual('src/helpers/ui'),
    showGlobalErrorHtml: jest.fn()
}))

function rejectWithApiError (data) {
    const err = new Error('Request failed with status code 422')
    err.response = { status: 422, data }
    apiPost.mockImplementation(() => Promise.reject(err).catch(handleRequestError))
}

async function getUploadError () {
    const file = new Blob(['name,number,customer_id\n'], { type: 'text/csv' })
    try {
        await uploadCsv({}, { customer_id: 1, file })
    } catch (err) {
        return err
    }
    throw new Error('uploadCsv did not fail')
}

describe('uploadCsv', () => {
    beforeEach(() => {
        showGlobalErrorHtml.mockClear()
    })

    it('shows every failure once, on its own line with the CSV line in bold', async () => {
        rejectWithApiError({
            code: 422,
            message: 'Validation failed',
            errorCode: 'VALIDATION_FAILED',
            errors: [
                { pointer: '/0/customer_id', code: 'isNumberString', message: 'customer_id must be a number string' },
                { pointer: '/1/number', code: 'isNotEmpty', message: 'number should not be empty' }
            ]
        })
        const err = await getUploadError()
        const text = 'Validation failed:\nLine 2: Customer_id must be a number string\nLine 3: Number should not be empty'
        expect(err.message).toBe(text)
        expect(showGlobalErrorHtml).toHaveBeenCalledWith(
            'Validation failed:<br><b>Line 2:</b> Customer_id must be a number string<br><b>Line 3:</b> Number should not be empty',
            text
        )
        expect(isErrorNotHandled(err)).toBeFalsy()
    })

    it('leaves out the summary when it repeats the first failure', async () => {
        rejectWithApiError({
            code: 422,
            message: 'Duplicate number in CSV',
            errorCode: 'DUPLICATE_IN_CSV',
            errors: [
                { pointer: '/2/number', code: 'DUPLICATE_IN_CSV', message: 'Duplicate number in CSV' }
            ]
        })
        const err = await getUploadError()
        expect(err.message).toBe('Line 4: Duplicate number in CSV')
        expect(showGlobalErrorHtml).toHaveBeenCalledWith('<b>Line 4:</b> Duplicate number in CSV', err.message)
    })

    it('shows a query parameter failure without a line, next to the row failures', async () => {
        rejectWithApiError({
            statusCode: 422,
            errorCode: 'VALIDATION_FAILED',
            message: 'Validation failed',
            errors: [
                { parameter: 'purge_existing_typo', code: 'whitelistValidation', message: 'parameter purge_existing_typo should not exist' },
                { pointer: '/0/customer_id', code: 'isNumberString', message: 'customer_id must be a number string' },
                { pointer: '/2/number', code: 'isNotEmpty', message: 'number should not be empty' }
            ]
        })
        const err = await getUploadError()
        const text = 'Validation failed:\nParameter purge_existing_typo should not exist\n' +
            'Line 2: Customer_id must be a number string\nLine 4: Number should not be empty'
        expect(err.message).toBe(text)
        expect(showGlobalErrorHtml).toHaveBeenCalledWith(
            'Validation failed:<br>Parameter purge_existing_typo should not exist<br>' +
                '<b>Line 2:</b> Customer_id must be a number string<br><b>Line 4:</b> Number should not be empty',
            text
        )
    })

    it('escapes the API texts and shows failures without a row as they are', async () => {
        rejectWithApiError({
            code: 422,
            message: 'Invalid <CSV>',
            errors: [{ code: 'CSV_MALFORMED', message: 'unexpected "<b>" & more' }]
        })
        await getUploadError()
        expect(showGlobalErrorHtml).toHaveBeenCalledWith(
            'Invalid &lt;CSV&gt;:<br>Unexpected &quot;&lt;b&gt;&quot; &amp; more',
            'Invalid <CSV>:\nUnexpected "<b>" & more'
        )
    })
})
