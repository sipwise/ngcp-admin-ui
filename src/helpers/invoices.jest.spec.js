import {
    getMonthPeriod,
    getPreviousMonth,
    toInvoiceCreateData,
    toInvoiceListFilter
} from 'src/helpers/invoices'

describe('getPreviousMonth', () => {
    it.each([
        ['in the middle of the year', new Date(2026, 10, 12), '2026-10'],
        ['on the first day of the month', new Date(2026, 10, 1, 0, 0), '2026-10'],
        ['on the last day of a long month', new Date(2026, 2, 31), '2026-02'],
        ['in January', new Date(2026, 0, 15), '2025-12']
    ])('%s', (_label, now, expected) => {
        expect(getPreviousMonth(now)).toBe(expected)
    })
})

describe('getMonthPeriod', () => {
    it.each([
        ['2026-10', '2026-10-31 23:59'],
        ['2026-11', '2026-11-30 23:59'],
        ['2026-02', '2026-02-28 23:59'],
        ['2028-02', '2028-02-29 23:59'],
        ['2026-12', '2026-12-31 23:59']
    ])('covers the whole month %s', (month, end) => {
        expect(getMonthPeriod(month)).toEqual({ start: `${month}-01 00:00`, end })
    })
})

describe('toInvoiceCreateData', () => {
    const base = { customer_id: 5, template_id: 1 }

    it.each([
        ['2026-10', '2026-10-01 00:00:00', '2026-10-31 23:59:59'],
        ['2026-02', '2026-02-01 00:00:00', '2026-02-28 23:59:59'],
        ['2028-02', '2028-02-01 00:00:00', '2028-02-29 23:59:59']
    ])('sends the whole month %s', (period, start, end) => {
        expect(toInvoiceCreateData({ ...base, period, custom_period: false, period_start: null, period_end: null }))
            .toEqual({ ...base, period_start: start, period_end: end })
    })

    it('ignores the custom start and end left from the custom period', () => {
        expect(toInvoiceCreateData({
            ...base,
            period: '2026-10',
            custom_period: false,
            period_start: '2026-10-10 08:30',
            period_end: '2026-10-15 12:00'
        })).toEqual({ ...base, period_start: '2026-10-01 00:00:00', period_end: '2026-10-31 23:59:59' })
    })

    it('sends the custom period, the end including its whole minute', () => {
        expect(toInvoiceCreateData({
            ...base,
            period: '2026-10',
            custom_period: true,
            period_start: '2026-09-10 08:30',
            period_end: '2026-09-15 12:00'
        })).toEqual({ ...base, period_start: '2026-09-10 08:30:00', period_end: '2026-09-15 12:00:59' })
    })
})

describe('toInvoiceListFilter', () => {
    it('includes the whole end minute of the period filter', () => {
        expect(toInvoiceListFilter({
            period_start_ge: '2026-10-01 00:00',
            period_end_le: '2026-10-31 23:59'
        })).toEqual({
            period_start_ge: '2026-10-01 00:00',
            period_end_le: '2026-10-31 23:59:59'
        })
    })

    it('does not modify the given filter', () => {
        const filter = { period_end_le: '2026-10-31 23:59' }
        toInvoiceListFilter(filter)
        expect(filter).toEqual({ period_end_le: '2026-10-31 23:59' })
    })

    it('keeps an end that already has seconds', () => {
        const filter = { period_end_le: '2026-10-31 23:59:59' }
        expect(toInvoiceListFilter(filter)).toBe(filter)
    })

    it('keeps a period filter without end', () => {
        const filter = { period_start_ge: '2026-10-01 00:00', period_end_le: null }
        expect(toInvoiceListFilter(filter)).toBe(filter)
    })

    it.each([
        ['a text filter', 'INV2026'],
        ['an empty filter', ''],
        ['no filter', undefined]
    ])('keeps %s', (_label, filter) => {
        expect(toInvoiceListFilter(filter)).toBe(filter)
    })
})
