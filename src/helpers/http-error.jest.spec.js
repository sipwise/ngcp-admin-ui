import { getApiErrorEntriesForItem, getApiErrorMessage } from 'src/helpers/http-error'

function errorBody (errorCode, message, errors) {
    return {
        tx: '725d5b49f5674d719db795cf2f81262e',
        statusCode: 422,
        path: '/api/v2/customercontacts',
        method: 'POST',
        error: 'Unprocessable Entity',
        errorCode,
        message,
        ...(errors ? { errors } : {})
    }
}

describe('getApiErrorMessage', () => {
    it('prefixes the failed checks with the message of a validation error', () => {
        const data = errorBody('VALIDATION_FAILED', 'Validation failed', [
            { pointer: '/1/status', code: 'isEnum', message: 'status must be one of the following values: active, terminated' },
            { pointer: '/1/email', code: 'isEmail', message: 'email must be an email' }
        ])
        expect(getApiErrorMessage(data)).toBe(
            'Validation failed: Status must be one of the following values: active, terminated. Email must be an email'
        )
    })

    it('does not repeat the message of an API error with one failure', () => {
        const data = errorBody('RESELLER_ID_INVALID', 'Invalid reseller_id', [
            { pointer: '/reseller_id', code: 'RESELLER_ID_INVALID', message: 'invalid reseller_id' }
        ])
        expect(getApiErrorMessage(data)).toBe('Invalid reseller_id')
    })

    it('lists every failure of an API error with more failures', () => {
        const data = errorBody('DOMAIN_ALREADY_EXISTS', "Domain 'sip.example.org' already exists", [
            { pointer: '/0/domain', code: 'DOMAIN_ALREADY_EXISTS', message: "domain 'sip.example.org' already exists" },
            { pointer: '/2/reseller_id', code: 'RESELLER_ID_INVALID', message: 'invalid reseller_id' }
        ])
        expect(getApiErrorMessage(data)).toBe("Domain 'sip.example.org' already exists. Invalid reseller_id")
    })

    it('keeps the message of a capped list', () => {
        const data = errorBody('VALIDATION_FAILED', 'Validation failed (1 of 3 errors shown)', [
            { pointer: '/0/email', code: 'isEmail', message: 'email must be an email' }
        ])
        expect(getApiErrorMessage(data)).toBe('Validation failed (1 of 3 errors shown): Email must be an email')
    })

    it('keeps only the count of a capped list of API errors', () => {
        const data = errorBody('DUPLICATE_IN_CSV', 'Duplicate in CSV (2 of 3 errors shown)', [
            { pointer: '/2/number', code: 'DUPLICATE_IN_CSV', message: 'duplicate in CSV' },
            { pointer: '/4/number', code: 'DUPLICATE_IN_CSV', message: 'duplicate in CSV' }
        ])
        expect(getApiErrorMessage(data)).toBe('2 of 3 errors shown: Duplicate in CSV. Duplicate in CSV')
    })

    it('lists parameter failures', () => {
        const data = errorBody('INVALID_PARAMETER', 'Validation failed', [
            { parameter: 'colour', code: 'whitelistValidation', message: 'parameter colour should not exist' }
        ])
        expect(getApiErrorMessage(data)).toBe('Validation failed: Parameter colour should not exist')
    })

    it('returns the message of a body without failures', () => {
        expect(getApiErrorMessage(errorBody('NOT_FOUND', 'Not Found'))).toBe('Not Found')
        expect(getApiErrorMessage(errorBody('NOT_FOUND', 'Not Found', []))).toBe('Not Found')
        expect(getApiErrorMessage(undefined)).toBeUndefined()
    })

    it('returns only the failures when there is no message', () => {
        const errors = [{ pointer: '/0/slot', code: 'isNotEmpty', message: 'slot should not be empty' }]
        expect(getApiErrorMessage({ errors })).toBe('Slot should not be empty')
    })

    it('formats the failures with the given function', () => {
        const data = errorBody('VALIDATION_FAILED', 'Validation failed', [
            { pointer: '/3/number', code: 'isNotEmpty', message: 'number should not be empty' }
        ])
        expect(getApiErrorMessage(data, ({ pointer, message }) => `${pointer} ${message}`))
            .toBe('Validation failed: /3/number number should not be empty')
    })
})

describe('getApiErrorEntriesForItem', () => {
    const data = errorBody('VALIDATION_FAILED', 'Validation failed', [
        { pointer: '/1/slot', code: 'isIn', message: 'slot must be one of *0 - *9' },
        { pointer: '/10/slot', code: 'isIn', message: 'slot must be one of *0 - *9' },
        { pointer: '/1', code: 'SUBSCRIBER_NOT_FOUND', message: 'subscriber not found' },
        { pointer: '/destination', code: 'isNotEmpty', message: 'destination should not be empty' },
        { parameter: 'customer_id', code: 'isInt', message: 'customer_id must be an integer number' }
    ])

    it('returns the failures of the item and its fields', () => {
        expect(getApiErrorEntriesForItem(data, 1).map(({ pointer }) => pointer)).toEqual(['/1/slot', '/1'])
        expect(getApiErrorEntriesForItem(data, 10).map(({ pointer }) => pointer)).toEqual(['/10/slot'])
    })

    it('returns the failures of an item of a body keyed by id', () => {
        const byId = errorBody('VALIDATION_FAILED', 'Validation failed', [
            { pointer: '/625/name', code: 'maxLength', message: 'name must be shorter than or equal to 255 characters' },
            { pointer: '/62', code: 'ENTRY_NOT_FOUND', message: 'entry not found' }
        ])
        expect(getApiErrorEntriesForItem(byId, 625).map(({ pointer }) => pointer)).toEqual(['/625/name'])
        expect(getApiErrorEntriesForItem(byId, '62').map(({ pointer }) => pointer)).toEqual(['/62'])
    })

    it('matches the escaped key', () => {
        const data = errorBody('VALIDATION_FAILED', 'Validation failed', [
            { pointer: '/a~1b~0c/name', code: 'isNotEmpty', message: 'name should not be empty' }
        ])
        expect(getApiErrorEntriesForItem(data, 'a/b~c')).toHaveLength(1)
    })

    it('returns no failures for a valid item or a body without failures', () => {
        expect(getApiErrorEntriesForItem(data, 0)).toEqual([])
        expect(getApiErrorEntriesForItem(errorBody('NOT_FOUND', 'Not Found'), 0)).toEqual([])
        expect(getApiErrorEntriesForItem(undefined, 0)).toEqual([])
    })
})
