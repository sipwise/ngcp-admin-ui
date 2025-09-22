<template>
    <base-dialog
        ref="dialog"
        title-icon="schedule"
        :title="$t('Edit Off-Peak Times')"
        v-bind="$attrs"
    >
        <template #content>
            <q-form
                ref="form"
                @submit="handleSubmit"
            >
                <div class="row q-gutter-md q-mb-md">
                    <div class="col-12">
                        <q-select
                            v-model="selectedWeekday"
                            :label="$t('Day of Week')"
                            :options="dayOptions"
                            option-value="value"
                            option-label="label"
                            emit-value
                            map-options
                        />
                    </div>
                </div>

                <div
                    v-for="(timeSlot, index) in formData"
                    :key="index"
                    class="q-mb-md"
                >
                    <div class="row q-gutter-md items-center">
                        <div class="col-12 col-md-4">
                            <q-input
                                v-model="timeSlot.start"
                                :label="$t('Start Time')"
                                mask="##:##:##"
                                placeholder="HH:MM:SS"
                                :error="!!(v$?.formData?.$each?.$response?.$data && v$?.formData?.$each?.$response?.$data[index]?.start?.$invalid)"
                                :error-message="getErrorMessage(index, 'start')"
                            />
                        </div>
                        <div class="col-12 col-md-4">
                            <q-input
                                v-model="timeSlot.stop"
                                :label="$t('End Time')"
                                mask="##:##:##"
                                placeholder="HH:MM:SS"
                                :error="!!(v$?.formData?.$each?.$response?.$data && v$?.formData?.$each?.$response?.$data[index]?.stop?.$invalid)"
                                :error-message="getErrorMessage(index, 'stop')"
                            />
                        </div>
                        <div class="col-auto">
                            <q-btn
                                v-if="formData.length > 1 || (timeSlot.start && timeSlot.stop)"
                                icon="delete"
                                color="negative"
                                flat
                                round
                                @click="removeTimeSlot(index)"
                            />
                        </div>
                    </div>
                </div>

                <div class="row q-mt-md">
                    <div class="col-12">
                        <q-btn
                            icon="add"
                            :label="$t('Add Time Slot')"
                            color="primary"
                            flat
                            @click="addTimeSlot"
                        />
                        <q-btn
                            icon="delete_sweep"
                            :label="$t('Clear All')"
                            color="negative"
                            flat
                            @click="deleteTimeSlots"
                        />
                    </div>
                </div>
            </q-form>
        </template>

        <template #actions>
            <q-btn
                icon="check"
                unelevated
                color="primary"
                label="Save"
                @click="handleSubmit"
            />
        </template>
    </base-dialog>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import BaseDialog from 'src/components/dialog/BaseDialog'
import { showGlobalErrorMessage, showGlobalWarningMessage } from 'src/helpers/ui'

export default {
    name: 'AuiOffPeakWeekDaysDialog',
    components: {
        BaseDialog
    },
    props: {
        slots: {
            type: Array,
            default: () => ([])
        },
        weekdayFilter: {
            type: Number,
            default: null
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    emits: ['ok'],
    data () {
        return {
            v$: useValidate(),
            selectedWeekday: this.weekdayFilter,
            formData: this.getFilteredSlots(this.weekdayFilter),
            isDirty: false
        }
    },
    computed: {
        dayOptions () {
            return this.columns.map((col) => ({
                label: col.title,
                value: parseInt(col.name)
            }))
        }
    },
    validations () {
        return {
            formData: {
                $each: helpers.forEach({
                    start: {
                        required,
                        format: helpers.withMessage(
                            this.$t('Allowed format: HH:mm:ss'),
                            (value) => !value.trim() || this.validateTime(value)
                        )
                    },
                    stop: {
                        required,
                        format: helpers.withMessage(
                            this.$t('Allowed format: HH:mm:ss'),
                            (value) => !value.trim() || this.validateTime(value)
                        ),
                        afterStart: helpers.withMessage(
                            this.$t('End time cannot be prior to start time'),
                            (value, sibling) => !value.trim() || this.validateStopTime(value, sibling)
                        )
                    }
                })
            }
        }
    },
    watch: {
        selectedWeekday: {
            handler (newWeekday, oldWeekday) {
                if (newWeekday !== oldWeekday) {
                    const newFilteredSlots = this.slots.filter((slot) => slot.weekday === newWeekday)

                    if (newFilteredSlots.length > 0) {
                        this.formData = [...newFilteredSlots]
                    } else {
                        this.formData = [{
                            start: null,
                            stop: null,
                            weekday: newWeekday
                        }]
                    }
                }
            }
        },
        formData: {
            handler () {
                this.isDirty = true
            },
            deep: true
        }
    },
    methods: {
        extractErrorMessage (fieldError) {
            if (!fieldError) {
                return null
            }

            if (Array.isArray(fieldError)) {
                const errorWithMessage = fieldError.find((err) => err?.$message)
                return errorWithMessage?.$message
            }

            return fieldError.$message
        },
        getErrorMessage (index, field) {
            const errors = this.v$?.formData?.$each?.$response?.$errors
            if (!errors || !errors[index] || !errors[index][field]) {
                return null
            }

            return this.extractErrorMessage(errors[index][field]) || this.$t('Invalid input')
        },
        addTimeSlot () {
            this.formData.push({
                start: null,
                stop: null,
                weekday: this.selectedWeekday
            })
        },
        createEmptySlot (weekday) {
            return [{
                start: null,
                stop: null,
                weekday
            }]
        },
        deleteTimeSlots () {
            this.formData = [{
                start: null,
                stop: null,
                weekday: this.selectedWeekday
            }]

            this.$refs.form.resetValidation()
        },
        getFilteredSlots (weekday) {
            const filteredSlots = this.slots.filter((slot) => slot.weekday === weekday)
            return filteredSlots.length > 0 ? [...filteredSlots] : this.createEmptySlot(weekday)
        },
        async handleSubmit () {
            if (!this.isDirty) {
                showGlobalWarningMessage(this.$t('No changes to save.'))
                return
            }

            const isFormValid = await this.v$.$validate()

            if (isFormValid) {
                const validSlots = this.formData.filter((slot) =>
                    slot.start && slot.stop && slot.start.trim() && slot.stop.trim()
                )

                this.$emit('ok', {
                    weekday: this.selectedWeekday,
                    slots: validSlots
                })
                return this.$refs.dialog.hide()
            }

            showGlobalErrorMessage(this.$t('Invalid input'))
        },
        validateStopTime (val, sibling) {
            const timeSlot = sibling
            return this.timeToMinutes(val) > this.timeToMinutes(timeSlot.start)
        },
        validateTime (val) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
            return timeRegex.test(val)
        },

        timeToMinutes (timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number)
            return hours * 3600 + minutes * 60 + seconds
        },

        removeTimeSlot (index) {
            if (this.formData.length > 1) {
                this.formData.splice(index, 1)
                return
            }

            this.formData[0] = {
                start: null,
                stop: null,
                weekday: this.selectedWeekday
            }
        }
    }
}
</script>
