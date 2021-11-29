<template>
    <aui-base-sub-context>
        <timeline
            ref="timeline"
            class="aui-timeline"
            :items="items"
            :options="options"
            :events="['rangechanged']"
            @rangechanged="timelineRangeChanged"
        />
    </aui-base-sub-context>
</template>

<script>
import moment from 'moment'
import { date } from 'quasar'
import _ from 'lodash'
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import {
    TIMELINE_DEFAULT_VIEW_DAYS_BEFORE_AND_AFTER_NOW,
    TIMELINE_YEARS_AHEAD_FOR_MAX_DATE,
    WAIT_PAGE
} from 'src/constants'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'

export default {
    name: 'AuiCustomerDetailsBillingProfileSchedule',
    components: { AuiBaseSubContext },
    component: {},
    data () {
        // TODO: in V1 for "now" was used server date with its timezone. But maybe we shouldn't follow that logic in V2.
        //       So let's use local Now date for the initial implementation
        const now = new Date()
        const initialDatesRange = {
            start: date.subtractFromDate(now, { days: TIMELINE_DEFAULT_VIEW_DAYS_BEFORE_AND_AFTER_NOW }),
            end: date.addToDate(now, { days: TIMELINE_DEFAULT_VIEW_DAYS_BEFORE_AND_AFTER_NOW })
        }
        return {
            items: [],
            options: {
                editable: false,
                start: initialDatesRange.start,
                end: initialDatesRange.end,
                locale: this.$i18n.locale,

                // Note: it looks like "vue-visjs" has an issue with applying locales for internal MomentJS. To overcome
                //       it from our side we are providing our version of Moment lib with locales. But it requires
                //       tracking application locale changes and applying new locale to our Moment lib manually.
                //       See boot/vue-vis.js
                moment: moment
            }
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        timelineMaxDate () {
            const now = new Date()
            // Note: according to documentation it should be "yearS" ... "date.addToDate(now, { years: ... })" but it rises an exception
            return date.addToDate(now, { year: TIMELINE_YEARS_AHEAD_FOR_MAX_DATE })
        },
        customerId () {
            return this.resourceObject?.id
        }
    },
    watch: {
        '$i18n.locale' (value) {
            this.$refs.timeline.setOptions({ locale: value })
        },
        async resourceObject () {
            await this.refresh()
        }
    },
    async mounted () {
        await this.refresh()
    },
    methods: {
        ...mapWaitingActions('billing', {
            getCustomerBillingProfilesMapping: WAIT_PAGE
        }),
        async refresh () {
            const range = this.$refs.timeline.getWindow()
            await this.loadDateRange(range.start, range.end)
        },
        async loadDateRange (start, end) {
            if (this.customerId) {
                const data = await this.getCustomerBillingProfilesMapping({
                    customerId: this.customerId,
                    start,
                    end
                })

                const contractCreate = new Date(data.timeline_data.contract.create_timestamp)
                const events = (data.timeline_data.events || [])

                this.items = events.map(event => {
                    const billingProfileTitle = event.billing_profile.name +
                        (event.network.name != null ? '<br/>' + event.network.name : '')
                    return {
                        start: (event.start_date != null ? new Date(event.start_date) : contractCreate),
                        end: (event.end_date != null ? new Date(event.end_date) : this.timelineMaxDate),
                        content: billingProfileTitle
                    }
                })
            }
        },
        timelineRangeChanged: _.debounce(async function (eventData) {
            if (eventData) {
                await this.loadDateRange(eventData.start, eventData.end)
            }
        }, 800)
    }
}
</script>
