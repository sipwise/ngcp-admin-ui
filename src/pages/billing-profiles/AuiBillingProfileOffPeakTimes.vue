<template>
    <div class="q-pa-md">
        <div class="column">
            <div class="col-auto">
                <q-tabs
                    v-model="activeTab"
                    class="text-primary"
                >
                    <q-tab
                        name="weekDays"
                        label="Off-peak Week Days"
                    />
                    <q-tab
                        name="dates"
                        label="Off-peak Dates"
                    />
                </q-tabs>
            </div>

            <div class="col">
                <q-tab-panels
                    v-model="activeTab"
                    class="calendar-container"
                    animated
                >
                    <q-tab-panel name="weekDays">
                        <aui-weekly-planner
                            :events-details="formattedTimeSlots"
                            @update-events="handleUpdateWeekdays"
                            @delete-events="handleWeekdaysDelete"
                        />
                    </q-tab-panel>

                    <q-tab-panel name="dates">
                        <aui-off-peak-special-dates-table
                            :rows="formattedSpecialDates"
                            @add-rows="handleSpecialDatesAdd"
                            @delete-row="handleSpecialDateRangeDelete"
                            @delete-rows="handleSpecialDatesDelete"
                            @update-row="handleSpecialDateUpdate"
                        />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </div>
</template>

<script>
import AuiOffPeakSpecialDatesTable from 'src/components/AuiOffPeakSpecialDatesTable'
import AuiWeeklyPlanner from 'src/components/AuiWeeklyPlanner'
import { WAIT_PAGE } from 'src/constants'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiBillingProfileOffPeakTimes',
    components: { AuiWeeklyPlanner, AuiOffPeakSpecialDatesTable },
    mixins: [billingProfileContextMixin],
    data () {
        return {
            activeTab: 'weekDays'
        }
    },
    computed: {
        formattedTimeSlots () {
            return this.formatWeekdaySlots(this.billingProfileContext?.peaktime_weekdays || [])
        },
        formattedSpecialDates () {
            return this.formatSpecialDates(this.billingProfileContext?.peaktime_special || [])
        }
    },
    watch: {
        activeTab () {
            this.refresh()
        }
    },
    methods: {
        ...mapWaitingActions('billing', {
            updateProfilePackagesPeakTimeWeekdays: WAIT_PAGE,
            updateProfilePackagesPeakTimeSpecialDates: WAIT_PAGE
        }),
        /*
         * Merges overlapping or contiguous date ranges.
         * This handles cases where multiple date intervals should
         * be displayed as a single consolidated date range.
         *
         * Example: [2019-01-01 to 2020-01-01, 2019-06-01 to 2020-06-01]
         * becomes [2019-01-01 to 2020-06-01]
         */
        formatSpecialDates (list) {
            if (!list.length) {
                return []
            }

            const sorted = [...list].sort((a, b) =>
                new Date(a.start).getTime() - new Date(b.start).getTime()
            )

            return sorted.reduce((merged, current) => {
                const last = merged[merged.length - 1]

                // If no previous interval or no overlap/contiguity
                if (!last || new Date(current.start) > new Date(last.stop)) {
                    merged.push({ ...current })
                } else {
                    // Merge overlapping/contiguous intervals - extend the end date if needed
                    const currentStop = new Date(current.stop)
                    const lastStop = new Date(last.stop)
                    last.stop = currentStop > lastStop ? current.stop : last.stop
                }

                return merged
            }, [])
        },
        /*
         * Merges overlapping or contiguous time slots for the same weekday.
         * This handles cases where multiple small intervals should
         * be displayed as a single consolidated time range.
         *
         * Example: [09:00-10:00, 09:30-11:00, 10:30-12:00] becomes [09:00-12:00]
         *
         */
        formatWeekdaySlots (list) {
            if (!list.length) {
                return []
            }

            const sorted = [...list].sort((a, b) =>
                a.weekday !== b.weekday
                    ? a.weekday - b.weekday
                    : a.start.localeCompare(b.start)
            )

            return sorted.reduce((merged, current) => {
                const last = merged[merged.length - 1]

                // If no previous interval or different weekday or no overlap
                if (!last ||
                    last.weekday !== current.weekday ||
                    current.start > last.stop) {
                    merged.push({ ...current })
                } else {
                    // Merge overlapping intervals - extend the end time if needed
                    last.stop = current.stop > last.stop ? current.stop : last.stop
                }

                return merged
            }, [])
        },
        handleWeekdaysDelete () {
            return this.updateWeekdays([])
        },
        handleSpecialDatesAdd (newDates) {
            const existingSpecialDates = this.formatSpecialDates(this.billingProfileContext?.peaktime_special || [])
            const updatedSpecialDates = this.formatSpecialDates([...existingSpecialDates, ...this.formatSpecialDates(newDates)])
            return this.updateSpecialDates(updatedSpecialDates)
        },
        handleSpecialDatesDelete () {
            return this.updateSpecialDates([])
        },
        handleSpecialDateRangeDelete (event) {
            const existingSpecialDates = this.formatSpecialDates(this.billingProfileContext?.peaktime_special || [])
            const updatedSpecialDates = existingSpecialDates.filter((_, i) => i !== event.index)
            return this.updateSpecialDates(updatedSpecialDates)
        },
        handleSpecialDateUpdate (event) {
            const existingSpecialDates = this.formatSpecialDates(this.billingProfileContext?.peaktime_special || [])
            const filteredSpecialDates = existingSpecialDates.filter((_, i) => i !== event.index)
            const updatedSpecialDates = this.formatSpecialDates([...filteredSpecialDates, event.row])
            return this.updateSpecialDates(updatedSpecialDates)
        },
        async refresh () {
            await this.reloadBillingProfileContext()
        },
        async updateSpecialDates (specialDates) {
            try {
                await this.updateProfilePackagesPeakTimeSpecialDates({
                    profileId: this.billingProfileContext.id,
                    specialDates
                })
            } finally {
                this.refresh()
            }
        },
        async updateWeekdays (timeWeekdays) {
            try {
                await this.updateProfilePackagesPeakTimeWeekdays({
                    profileId: this.billingProfileContext.id,
                    timeWeekdays
                })
            } finally {
                this.refresh()
            }
        },
        async handleUpdateWeekdays (newSlots) {
            const formattedNewSlots = this.formatWeekdaySlots(newSlots.slots)
            const existingSlots = this.formatWeekdaySlots(this.billingProfileContext?.peaktime_weekdays || [])
            const targetWeekday = newSlots.weekday
            const otherWeekdaysSlots = existingSlots.filter((interval) =>
                interval.weekday !== targetWeekday
            )
            const updatedIntervals = this.formatWeekdaySlots([...otherWeekdaysSlots, ...formattedNewSlots])
            return this.updateWeekdays(updatedIntervals)
        }
    }
}
</script>
