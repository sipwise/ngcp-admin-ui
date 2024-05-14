import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        timeSetContext () {
            const data = this.getDataContextObject('subscriberDetailsCallForwardingTimeSetContext')
            if (!data || !data.times) {
                return null
            }
            const transformedData = {
                ...data,
                times: data.times.map(time => {
                    const transformTimeField = (field) => {
                        if (field == null) {
                            return ''
                        } else {
                            return field.split('-').map(Number).map(num => num.toString())
                        }
                    }

                    const [startMonth, endMonth] = transformTimeField(time.month)
                    const [startYear, endYear] = transformTimeField(time.year)
                    const [startDay, endDay] = transformTimeField(time.mday)
                    const [startWDay, endWDay] = transformTimeField(time.wday)
                    const [startHour, endHour] = transformTimeField(time.hour)
                    const [startMinute, endMinute] = transformTimeField(time.minute)

                    return {
                        startMonth,
                        endMonth,
                        startYear,
                        endYear,
                        startDay,
                        endDay,
                        startWDay,
                        endWDay,
                        startHour,
                        endHour,
                        startMinute,
                        endMinute
                    }
                })
            }
            return transformedData
        }
    },
    methods: {
        async reloadTimeSetContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingTimeSetContext')
        }
    }
}
