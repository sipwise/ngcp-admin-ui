jest.mock('boot/i18n', () => ({
    i18n: {
        global: {
            locale: 'en-US',
            t: (key) => key
        }
    }
}))

import {
    destinationSetLabel,
    formatDestinationWithTimeout,
    getTimeEntryColumnLabels,
    getTimeEntryRowValues
} from 'src/helpers/call-forwarding'

describe('getTimeEntryColumnLabels', () => {
    it('returns one label per time field, in a fixed order', () => {
        expect(getTimeEntryColumnLabels()).toEqual(['Year', 'Month', 'Day', 'Weekday', 'Hour', 'Minute'])
    })
})

describe('getTimeEntryRowValues', () => {
    it('leaves empty space for fields with no data', () => {
        expect(getTimeEntryRowValues({})).toEqual(['', '', '', '', '', ''])
        expect(getTimeEntryRowValues(null)).toEqual(['', '', '', '', '', ''])
    })

    it('shows raw values as received for year/day/hour/minute, without reinterpreting them', () => {
        expect(getTimeEntryRowValues({
            year: '2026',
            mday: '24',
            hour: '9',
            minute: '30'
        })).toEqual(['2026', '', '24', '', '9', '30'])
    })

    it('shows the full month name (1-indexed: 1 = January), matching monthValue() in src/store/subscribers/getters.js', () => {
        expect(getTimeEntryRowValues({ month: '1' })).toEqual(['', 'January', '', '', '', ''])
        expect(getTimeEntryRowValues({ month: '12' })).toEqual(['', 'December', '', '', '', ''])
    })

    it('shows the weekday name (1-indexed: 1 = Sunday), matching weekdayValue() in src/store/subscribers/getters.js', () => {
        expect(getTimeEntryRowValues({ wday: '1' })).toEqual(['', '', '', 'Sunday', '', ''])
        expect(getTimeEntryRowValues({ wday: '2' })).toEqual(['', '', '', 'Monday', '', ''])
        expect(getTimeEntryRowValues({ wday: '7' })).toEqual(['', '', '', 'Saturday', '', ''])
    })

    it('shows ranges as "start - end", applying the same per-field formatting to both ends', () => {
        expect(getTimeEntryRowValues({
            year: '2020-2026',
            month: '1-3',
            wday: '2-6',
            hour: '9-17'
        })).toEqual(['2020 - 2026', 'January - March', '', 'Monday - Friday', '9 - 17', ''])
    })
})

describe('formatDestinationWithTimeout', () => {
    it('appends the timeout suffix for an explicit 0-second timeout, distinguishing it from no timeout', () => {
        expect(formatDestinationWithTimeout({ destination: 'sip:foo@example.com', timeout: 0 })).toBe('{destination} for {timeout}s')
    })

    it('omits the suffix when no timeout is set', () => {
        expect(formatDestinationWithTimeout({ destination: 'sip:foo@example.com' })).toBe('sip:foo@example.com')
    })
})

describe('destinationSetLabel', () => {
    it('falls back to a placeholder when the mapping has no destination set', () => {
        expect(destinationSetLabel({})).toBe('No destination')
    })

    it('returns the destination set name when present', () => {
        expect(destinationSetLabel({ destinationset: 'My Set' })).toBe('My Set')
    })
})
