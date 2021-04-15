<template>
    <q-input
        :value="dateTimeDisplayValue"
        readonly
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-slot:prepend
        >
            <q-btn
                ref="dateButton"
                icon="today"
                color="primary"
                flat
                dense
                :disable="$attrs.loading"
            >
                <q-popup-proxy
                    anchor="center right"
                    self="center left"
                >
                    <q-card
                        class="no-margin no-padding"
                    >
                        <q-card-actions
                            class="bg-primary q-pb-none"
                            align="center"
                        >
                            <q-btn
                                color="white"
                                :label="$t('Time')"
                                icon="watch_later"
                                outline
                                size="sm"
                                @click="openTimeSelection"
                            />
                        </q-card-actions>
                        <q-card-section
                            class="no-margin no-padding"
                        >
                            <q-date
                                v-model="dateTime"
                                class="no-shadow no-border-radius"
                                today-btn
                                :mask="INTERNAL_DATE_TIME_FORMAT"
                                :options="dateOptions"
                                :default-year-month="defaultYearMonth"
                                @input="emitInput"
                            />
                        </q-card-section>
                        <q-card-actions
                            class="q-pt-none"
                            align="right"
                        >
                            <q-btn
                                v-close-popup
                                color="negative"
                                :label="$t('Unset')"
                                unelevated
                                icon="delete"
                                size="sm"
                                @click="remove"
                            />
                            <q-btn
                                v-close-popup
                                color="primary"
                                :label="$t('Close')"
                                outline
                                unelevated
                                size="sm"
                                icon="clear"
                            />
                        </q-card-actions>
                    </q-card>
                </q-popup-proxy>
            </q-btn>
        </template>
        <template
            v-slot:append
        >
            <q-btn
                ref="timeButton"
                icon="watch_later"
                color="primary"
                flat
                dense
                :disable="$attrs.loading"
            >
                <q-popup-proxy
                    anchor="center left"
                    self="center right"
                >
                    <q-card
                        class="no-margin no-padding"
                    >
                        <q-card-actions
                            class="bg-primary q-pb-none"
                            align="center"
                        >
                            <q-btn
                                color="white"
                                :label="$t('Date')"
                                outline
                                icon="today"
                                size="sm"
                                @click="openDateSelection"
                            />
                        </q-card-actions>
                        <q-card-section
                            class="no-margin no-padding"
                        >
                            <q-time
                                v-model="dateTime"
                                class="no-shadow no-border-radius"
                                format24h
                                now-btn
                                :mask="INTERNAL_DATE_TIME_FORMAT"
                                :options="timeOptions"
                                @input="emitInput"
                            />
                        </q-card-section>
                        <q-card-actions
                            align="right"
                        >
                            <q-btn
                                v-close-popup
                                color="negative"
                                :label="$t('Unset')"
                                unelevated
                                icon="delete"
                                size="sm"
                                @click="remove"
                            />
                            <q-btn
                                v-close-popup
                                color="primary"
                                :label="$t('Close')"
                                outline
                                unelevated
                                size="sm"
                                icon="clear"
                            />
                        </q-card-actions>
                    </q-card>
                </q-popup-proxy>
            </q-btn>
        </template>
    </q-input>
</template>

<script>
import {
    date
} from 'quasar'
import {
    DATETIME_DEFAULT_DISPLAY_FORMAT,
    DATETIME_DEFAULT_API_FORMAT,
    INTERNAL_DATE_FORMAT,
    INTERNAL_DATE_TIME_FORMAT,
    INTERNAL_TIME_FORMAT
} from 'src/constants'

export default {
    name: 'AuiInputDateTime',
    props: {
        value: {
            type: String,
            default: null
        },
        displayFormat: {
            type: String,
            default: DATETIME_DEFAULT_DISPLAY_FORMAT
        },
        exchangeFormat: {
            type: String,
            default: DATETIME_DEFAULT_API_FORMAT
        },
        pastSelectable: {
            type: Boolean,
            default: true
        },
        pastThreshold: {
            type: String,
            default () {
                return date.formatDate(new Date(), this.exchangeFormat)
            }
        }
    },
    data () {
        return {
            dateTime: null
        }
    },
    computed: {
        INTERNAL_DATE_TIME_FORMAT () {
            return INTERNAL_DATE_TIME_FORMAT
        },
        dateTimeDisplayValue () {
            if (this.dateTime !== undefined && this.dateTime !== null) {
                return date.formatDate(this.dateTimeObject, this.displayFormat)
            } else {
                return ''
            }
        },
        dateTimeObject () {
            return date.extractDate(this.dateTime, INTERNAL_DATE_TIME_FORMAT)
        },
        date () {
            return date.formatDate(this.dateTimeObject, INTERNAL_DATE_FORMAT)
        },
        time () {
            return date.formatDate(this.dateTimeObject, INTERNAL_TIME_FORMAT)
        },
        hour () {
            return Number(date.formatDate(this.dateTimeObject, 'HH'))
        },
        minute () {
            return Number(date.formatDate(this.dateTimeObject, 'mm'))
        },
        pastThresholdObject () {
            return date.extractDate(this.pastThreshold, this.exchangeFormat)
        },
        pastThresholdDate () {
            return date.formatDate(this.pastThresholdObject, INTERNAL_DATE_FORMAT)
        },
        pastThresholdTime () {
            return date.formatDate(this.pastThresholdObject, INTERNAL_TIME_FORMAT)
        },
        pastThresholdHour () {
            return Number(date.formatDate(this.pastThresholdObject, 'HH'))
        },
        pastThresholdMinute () {
            return Number(date.formatDate(this.pastThresholdObject, 'mm'))
        },
        defaultYearMonth () {
            if (this.pastThreshold !== undefined && this.pastThreshold !== null) {
                return date.formatDate(this.pastThresholdObject, 'YYYY/MM')
            } else {
                return date.formatDate(new Date(), 'YYYY/MM')
            }
        }
    },
    watch: {
        value (newValue) {
            this.syncData(newValue)
        }
    },
    mounted () {
        this.syncData(this.value)
    },
    methods: {
        emitInput () {
            let value = null
            if (this.dateTime !== null) {
                value = date.formatDate(this.dateTimeObject, this.exchangeFormat)
            }
            this.$emit('input', value)
        },
        openDateSelection () {
            if (this.$refs.dateButton) {
                this.$refs.dateButton.$el.click()
            }
        },
        openTimeSelection () {
            if (this.$refs.timeButton) {
                this.$refs.timeButton.$el.click()
            }
        },
        dateOptions (dateToCheck) {
            if (!this.pastSelectable) {
                return dateToCheck >= this.pastThresholdDate
            } else {
                return this.pastSelectable
            }
        },
        timeOptions (hour, minute) {
            if (!this.pastSelectable) {
                if (minute === null && this.date === this.pastThresholdDate) {
                    return Number(hour) >= this.pastThresholdHour
                } else if (minute !== null &&
                    this.date === this.pastThresholdDate &&
                    this.hour === this.pastThresholdHour) {
                    return Number(minute) !== 0 && Number(minute) >= Number(this.pastThresholdMinute)
                } else {
                    return true
                }
            } else {
                return this.pastSelectable
            }
        },
        syncData (newValue) {
            if (newValue !== undefined && newValue !== null) {
                const dateTimeObject = date.extractDate(newValue, this.exchangeFormat)
                this.dateTime = date.formatDate(dateTimeObject, INTERNAL_DATE_TIME_FORMAT)
            } else {
                this.dateTime = null
            }
        },
        remove () {
            this.dateTime = null
            this.emitInput()
        }
    }
}
</script>
