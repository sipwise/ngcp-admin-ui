jest.mock('boot/i18n', () => ({ i18n: { global: { t: (key) => key } } }))

import {
    buildInvoiceTemplatePatch,
    buildInvoiceTemplatePayload,
    isResellerRequired
} from 'src/helpers/invoice-templates'

describe('isResellerRequired', () => {
    it.each([
        ['customer', true],
        ['did', true],
        ['reseller', false],
        ['peer', false]
    ])('category %s -> %s', (category, expected) => {
        expect(isResellerRequired(category)).toBe(expected)
    })
})

describe('buildInvoiceTemplatePayload', () => {
    const base = { name: 'tpl', type: 'svg', call_direction: 'out' }

    it('sends the reseller for categories that require it', () => {
        expect(buildInvoiceTemplatePayload({ ...base, category: 'did', reseller_id: 2 }))
            .toEqual({ ...base, category: 'did', reseller_id: 2 })
    })

    it.each(['peer', 'reseller'])('leaves the reseller out for category %s, the API rejects it', (category) => {
        expect(buildInvoiceTemplatePayload({ ...base, category, reseller_id: 2 }))
            .toEqual({ ...base, category })
    })

    it('leaves the reseller out when there is none (reseller users get their own from the API)', () => {
        expect(buildInvoiceTemplatePayload({ ...base, category: 'customer', reseller_id: null }))
            .toEqual({ ...base, category: 'customer' })
    })
})

describe('buildInvoiceTemplatePatch', () => {
    const initial = { name: 'a', reseller_id: 1, type: 'svg', call_direction: 'out', category: 'customer' }

    it('only contains the fields that changed', () => {
        expect(buildInvoiceTemplatePatch(initial, { ...initial, name: 'b', call_direction: 'in' })).toEqual([
            { op: 'replace', path: '/name', value: 'b' },
            { op: 'replace', path: '/call_direction', value: 'in' }
        ])
    })

    it('does not patch the category, which cannot be edited', () => {
        expect(buildInvoiceTemplatePatch(initial, { ...initial, category: 'peer', reseller_id: null })).toEqual([
            { op: 'replace', path: '/reseller_id', value: null }
        ])
    })

    it('treats undefined and null resellers as the same value', () => {
        expect(buildInvoiceTemplatePatch({ ...initial, reseller_id: null }, { ...initial, reseller_id: undefined })).toEqual([])
    })

    it('is empty when nothing changed and never patches the type', () => {
        expect(buildInvoiceTemplatePatch(initial, { ...initial, type: 'html' })).toEqual([])
    })
})
