
import ApiExpand from 'src/helpers/api-expand'

describe('ApiExpand', () => {
    let apiExpand = null
    beforeEach(() => {
        apiExpand = new ApiExpand()
    })

    it('should not add invalid values', () => {
        const inputs = [
            undefined,
            null,
            String(''),
            String('   '),
            NaN,
            Number(1),
            Number(1.1),
            Number(0),
            Number(-1),
            Number(-1.1),
            Boolean(true),
            Boolean(false),
            [],
            {},
            () => {},
            function () {}
        ]
        inputs.forEach((input) => {
            apiExpand.add(input)
            expect(apiExpand.toString()).toEqual('')
            expect(apiExpand.size()).toBe(0)
        })
    })

    it('should add new expand', () => {
        apiExpand.add('contact_id')
        const result = apiExpand.toString().split(',')
        expect(result).toContain('contact_id')
        expect(apiExpand.size()).toBe(1)
    })

    it('should add new trimmed expand', () => {
        apiExpand.add(' contact_id ')
        apiExpand.add('reseller_id ')
        apiExpand.add(' customer_id')
        const result = apiExpand.toString().split(',')
        expect(result).toContain('contact_id')
        expect(result).not.toContain(' contact_id ')
        expect(result).toContain('reseller_id')
        expect(result).not.toContain('reseller_id ')
        expect(result).toContain('customer_id')
        expect(result).not.toContain(' customer_id')
        expect(apiExpand.size()).toBe(3)
    })

    it('should add multiple expands', () => {
        apiExpand.add('contact_id')
        apiExpand.add('reseller_id')
        apiExpand.add('customer_id')
        const result = apiExpand.toString().split(',')
        expect(result).toContain('contact_id')
        expect(result).toContain('reseller_id')
        expect(result).toContain('customer_id')
        expect(apiExpand.size()).toBe(3)
    })

    it('should consolidate nested expands', () => {
        apiExpand.add('contact_id')
        apiExpand.add('contact_id.reseller_id')
        const result = apiExpand.toString().split(',')
        expect(result).toContain('contact_id.reseller_id')
        expect(apiExpand.size()).toBe(1)
    })

    it('should consolidate nested expands in reverse order', () => {
        apiExpand.add('contact_id.reseller_id')
        apiExpand.add('contact_id')
        const result = apiExpand.toString().split(',')
        expect(result).toContain('contact_id.reseller_id')
        expect(apiExpand.size()).toBe(1)
    })

    it('should consolidate nested expands with duplicates', () => {
        apiExpand.add('contact_id')
        apiExpand.add('contact_id.reseller_id')
        apiExpand.add('contact_id.customer_id')
        apiExpand.add('contact_id')
        apiExpand.add('contact_id.reseller_id')
        apiExpand.add('contact_id.customer_id.reseller_id')
        apiExpand.add('contact_id.reseller_id')
        const result = apiExpand.toString().split(',')
        expect(result).not.toContain('contact_id')
        expect(result).not.toContain('contact_id.customer_id')
        expect(result).toContain('contact_id.reseller_id')
        expect(result).toContain('contact_id.customer_id.reseller_id')
        expect(apiExpand.size()).toBe(2)
    })
})
