jest.mock('boot/i18n', () => ({ i18n: { global: { t: (key) => key } } }))

import {
    buildInvoiceTemplatePatch,
    buildInvoiceTemplatePayload,
    flattenInvoiceTemplateVars,
    getInvoiceTemplateMarkers,
    isResellerRequired,
    unescapeInvoiceTemplateDirectives
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

describe('unescapeInvoiceTemplateDirectives', () => {
    it('restores quotes inside directives only', () => {
        const input = '<text>[% date_now(format=&#x27;%Y-%m-%d&#x27;) %]</text><text>it&#x27;s &quot;x&quot;</text>'
        expect(unescapeInvoiceTemplateDirectives(input))
            .toBe('<text>[% date_now(format=\'%Y-%m-%d\') %]</text><text>it&#x27;s &quot;x&quot;</text>')
    })

    it('handles double-quote entities and multiple directives', () => {
        const input = '[% date_now(format=&quot;%Y&quot;) %] [% invoice.serial %]'
        expect(unescapeInvoiceTemplateDirectives(input)).toBe('[% date_now(format="%Y") %] [% invoice.serial %]')
    })
})

describe('flattenInvoiceTemplateVars', () => {
    it('flattens nested variables into template expressions', () => {
        const result = flattenInvoiceTemplateVars({
            customer: { id: 1, vat_rate: null },
            cur: 'EUR',
            aux: { page: 1 },
            'date_now()': 'date_now(format=\'%Y-%m-%d\')'
        })
        expect(result).toEqual([
            { path: 'customer.id', expression: '[% customer.id %]', example: '1' },
            { path: 'customer.vat_rate', expression: '[% customer.vat_rate %]', example: '' },
            { path: 'cur', expression: '[% cur %]', example: 'EUR' },
            { path: 'aux.page', expression: '[% aux.page %]', example: '1' },
            { path: 'date_now()', expression: '[% date_now(format=\'%Y-%m-%d\') %]', example: 'date_now(format=\'%Y-%m-%d\')' }
        ])
    })

    it('ignores arrays and empty input', () => {
        expect(flattenInvoiceTemplateVars({ calls: [{ a: 1 }] })).toEqual([])
        expect(flattenInvoiceTemplateVars(undefined)).toEqual([])
    })
})

describe('getInvoiceTemplateMarkers', () => {
    const names = (category) => getInvoiceTemplateMarkers(category).map(({ marker }) => marker)

    it('offers calls only to customer templates', () => {
        expect(names('customer')).toContain('<!--@calls-->')
        expect(names('did')).not.toContain('<!--@calls-->')
        expect(names('peer')).not.toContain('<!--@calls-->')
    })

    it('offers foreach-did and did-zones only to did templates', () => {
        expect(names('did')).toEqual(expect.arrayContaining(['<!--@foreach-did-->', '<!--@did-zones-->']))
        expect(names('customer')).not.toContain('<!--@foreach-did-->')
        expect(names('reseller')).not.toContain('<!--@did-zones-->')
    })

    it('offers the common markers to every category', () => {
        ['customer', 'did', 'peer', 'reseller'].forEach((category) => {
            expect(names(category)).toEqual(expect.arrayContaining(['<!--@zones-->', '<!--@end-->', '<!--@pagebreak-->']))
        })
    })
})
