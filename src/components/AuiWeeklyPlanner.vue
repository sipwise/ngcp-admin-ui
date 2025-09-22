<template>
    <div class="q-gutter-sm row">
        <div v-if="canUse">
            <q-btn
                icon="add"
                flat
                color="primary"
                @click="openAddEventsDialog()"
            >
                <q-tooltip>
                    {{ $t('Add Time Slot') }}
                </q-tooltip>
            </q-btn>
            <q-btn
                icon="delete_sweep"
                flat
                color="negative"
                @click="openDeleteAllDialog()"
            >
                <q-tooltip>
                    {{ $t('Clear All') }}
                </q-tooltip>
            </q-btn>
        </div>
        <div class="row">
            <div class="calendar-container">
                <DayPilotCalendar
                    ref="calendar"
                    :config="processedConfig"
                    :events="events"
                    :columns="columns"
                    @time-range-selected="handleTimeRangeSelected"
                    @event-click="handleClickEvent"
                />
                <q-tooltip v-if="canUse">
                    {{ $t('Click the calendar to add a time slot') }}
                </q-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import { DayPilotCalendar } from '@daypilot/daypilot-lite-vue'
import AuiOffPeakWeekDaysDialog from 'src/components/dialog/AuiOffPeakWeekDaysDialog'
import NegativeConfirmationDialog from 'src/components/dialog/NegativeConfirmationDialog'

export default {
    name: 'AuiWeeklyPlanner',
    components: { DayPilotCalendar },
    props: {
        eventsDetails: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update-events', 'delete-events'],
    data () {
        return {
            events: [],
            columns: [
                { name: '0', title: this.$t('Monday') },
                { name: '1', title: this.$t('Tuesday') },
                { name: '2', title: this.$t('Wednesday') },
                { name: '3', title: this.$t('Thursday') },
                { name: '4', title: this.$t('Friday') },
                { name: '5', title: this.$t('Saturday') },
                { name: '6', title: this.$t('Sunday') }
            ],
            config: {
                viewType: 'Week',
                headerDateFormat: 'dddd',
                cellDuration: 60,
                cellHeight: 40,
                crosshairType: 'Header',
                businessBeginsHour: 0,
                businessEndsHour: 24,
                dayBeginsHour: 0,
                dayEndsHour: 24,
                businessWeekends: true,
                weekStarts: 1,
                heightSpec: 'Full',
                columnWidthSpec: 'Fixed',
                columnWidth: 100,
                width: 800,
                hoursVerticalWidth: 70,
                timeFormat: 'Clock24Hours'
            },
            resizeTimeout: null
        }
    },
    computed: {
        canUse () {
            return this.$aclCan('update', 'entity.billingprofiles')
        },
        processedConfig () {
            if (!this.canUse) {
                return {
                    ...this.config,
                    readOnly: true,
                    contextMenu: null,
                    eventClickHandling: 'Disabled',
                    eventHoverHandling: 'Disabled',
                    eventMoveHandling: 'Disabled',
                    eventResizeHandling: 'Disabled',
                    timeRangeSelectedHandling: 'Disabled',
                    eventEditHandling: 'Disabled'
                }
            }
            return this.config
        }
    },
    watch: {
        eventsDetails: {
            handler () {
                this.convertEventsForCalendarUse()
            },
            deep: true
        }
    },
    methods: {
        convertEventsForCalendarUse () {
            // Calendar only works if you use actual Date object
            const baseDate = this.getStartOfWeek()
            const events = this.eventsDetails.map((interval, index) => {
                const eventDate = new Date(baseDate)
                eventDate.setDate(eventDate.getDate() + interval.weekday)
                const [startHour, startMin] = interval.start.split(':').map(Number)
                const [stopHour, stopMin] = interval.stop.split(':').map(Number)

                // Use UTC methods to avoid timezone conversion issues
                const start = new Date(eventDate)
                start.setUTCHours(startHour, startMin, 0, 0)
                const end = new Date(eventDate)
                end.setUTCHours(stopHour, stopMin, 0, 0)

                return {
                    id: index.toString(),
                    text: `${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}-${stopHour.toString().padStart(2, '0')}:${stopMin.toString().padStart(2, '0')}`,
                    start,
                    end,
                    resource: interval.weekday
                }
            })
            this.events = events
            // If calendar is already initialized, update it
            if (this.$refs.calendar && this.$refs.calendar.control) {
                this.$refs.calendar.control.update()
            }
        },
        openAddEventsDialog (weekdayFilter) {
            this.$q.dialog({
                component: AuiOffPeakWeekDaysDialog,
                componentProps: {
                    slots: this.eventsDetails,
                    weekdayFilter: weekdayFilter || 0,
                    columns: this.columns
                }
            }).onOk((updatedEvents) => {
                this.$emit('update-events', updatedEvents)
            })
        },
        openDeleteAllDialog () {
            return this.$q.dialog({
                component: NegativeConfirmationDialog,
                componentProps: {
                    title: this.$t('Do you want to delete all events?'),
                    icon: 'delete_forever',
                    text: this.$t('If you proceed all events will be deleted. Do you want to continue?'),
                    buttonIcon: 'delete_forever',
                    buttonLabel: this.$t('Continue')
                }
            }).onOk(() => {
                this.$emit('delete-events')
            })
        },
        handleTimeRangeSelected (arg) {
            const weekDay = arg.start.getDayOfWeek() - 1
            this.handleUpdateEvents(weekDay)
        },
        handleClickEvent (arg) {
            this.handleUpdateEvents(arg.e.data.resource)
        },
        handleUpdateEvents (weekday) {
            this.openAddEventsDialog(weekday)
        },
        getStartOfWeek () {
            const now = new Date()
            const day = now.getDay()
            const diff = now.getDate() - day + (day === 0 ? -6 : 1)
            return new Date(now.setDate(diff))
        }
    }
}
</script>

<style scoped>
.calendar-container {
    max-width: 100%;
    max-height: 100%;
    overflow-x: auto;
}
</style>
