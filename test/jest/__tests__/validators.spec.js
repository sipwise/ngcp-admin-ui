import { isTime } from 'src/validators/common'

describe('Custom validators', function () {
    describe('isTime', function () {
        it('isTime - incorrect values', function () {
            expect(isTime()).toBeFalsy()
            expect(isTime('')).toBeFalsy()
            expect(isTime(null)).toBeFalsy()
            expect(isTime(NaN)).toBeFalsy()
            expect(isTime(true)).toBeFalsy()
            expect(isTime(false)).toBeFalsy()
            expect(isTime('123')).toBeFalsy()
            expect(isTime('abcd')).toBeFalsy()
            expect(isTime('aa:bb')).toBeFalsy()
            expect(isTime('aa:bb:cc')).toBeFalsy()
            expect(isTime('aa:bb:cc')).toBeFalsy()

            expect(isTime('25:00')).toBeFalsy()
            expect(isTime('00:60')).toBeFalsy()
            expect(isTime('25:60')).toBeFalsy()
            expect(isTime('123:321')).toBeFalsy()

            expect(isTime('25:00:00')).toBeFalsy()
            expect(isTime('00:60:00')).toBeFalsy()
            expect(isTime('00:00:60')).toBeFalsy()
            expect(isTime('25:60:60')).toBeFalsy()
            expect(isTime('123:321:123')).toBeFalsy()

            expect(isTime('0:0:0:0')).toBeFalsy()
            expect(isTime('1:2:3:4')).toBeFalsy()

            expect(isTime('01:')).toBeFalsy()
            expect(isTime(':01')).toBeFalsy()
            expect(isTime('00:01:')).toBeFalsy()
            expect(isTime(':00:01')).toBeFalsy()

            expect(isTime('-1:00')).toBeFalsy()
            expect(isTime('1:-2')).toBeFalsy()

            expect(isTime('-1:00:00')).toBeFalsy()
            expect(isTime('1:-2:0')).toBeFalsy()
            expect(isTime('1:2:-3')).toBeFalsy()
            expect(isTime('01:02:-30')).toBeFalsy()
        })

        it('isTime - correct values', function () {
            expect(isTime('0:0')).toBeTruthy()
            expect(isTime('00:00')).toBeTruthy()
            expect(isTime('1:1')).toBeTruthy()
            expect(isTime('01:01')).toBeTruthy()
            expect(isTime('11:22')).toBeTruthy()
            expect(isTime('23:00')).toBeTruthy()
            expect(isTime('00:59')).toBeTruthy()
            expect(isTime('23:59')).toBeTruthy()

            expect(isTime('0:0:0')).toBeTruthy()
            expect(isTime('00:00:00')).toBeTruthy()
            expect(isTime('1:1:1')).toBeTruthy()
            expect(isTime('01:01:01')).toBeTruthy()
            expect(isTime('11:22:33')).toBeTruthy()
            expect(isTime('23:00:00')).toBeTruthy()
            expect(isTime('00:59:00')).toBeTruthy()
            expect(isTime('00:00:59')).toBeTruthy()
            expect(isTime('23:59:59')).toBeTruthy()
        })
    })
})
