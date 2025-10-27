<template>
    <base-dialog
        ref="dialog"
        title-icon="schedule"
        :title="$t('Edit Special Dates')"
        v-bind="$attrs"
    >
        <template #content>
            <q-form
                ref="form"
                @submit="handleSubmit"
            >
                <div
                    v-for="(specialDate, index) in formData"
                    :key="index"
                    class="q-mb-md"
                >
                    <q-card
                        flat
                        bordered
                        class="q-pa-md"
                    >
                        <div class="column q-gutter-md">
                            <div>
                                <label class="text-caption text-weight-medium">{{ $t('Start Date') }}</label>
                                <q-input
                                    v-model="specialDate.start"
                                    type="datetime-local"
                                    dense
                                    :error="v$?.formData?.$each.$response.$data[index].start.$invalid"
                                    :error-message="getErrorMessage(index, 'start')"
                                />
                            </div>
                            <div>
                                <label class="text-caption text-weight-medium">{{ $t('End Date') }}</label>
                                <q-input
                                    v-model="specialDate.stop"
                                    type="datetime-local"
                                    dense
                                    :error="v$?.formData?.$each.$response.$data[index].stop.$invalid"
                                    :error-message="getErrorMessage(index, 'stop')"
                                />
                            </div>
                            <div class="row justify-end q-mb-sm">
                                <q-btn
                                    v-if="formData.length > 1 || (specialDate.start && specialDate.stop)"
                                    icon="delete"
                                    color="negative"
                                    flat
                                    dense
                                    size="sm"
                                    @click="removeSpecialDate(index)"
                                />
                            </div>
                        </div>
                    </q-card>
                </div>

                <div class="row justify-center q-mt-md q-gutter-md">
                    <q-btn
                        icon="add"
                        flat
                        :label="$t('Add Date Range')"
                        color="primary"
                        @click="addSpecialDate"
                    />
                    <q-btn
                        icon="delete_sweep"
                        flat
                        :label="$t('Clear All')"
                        color="negative"
                        @click="deleteSpecialDates"
                    />
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
    name: 'AuiOffPeakSpecialDatesDialog',
    components: {
        BaseDialog
    },
    emits: ['ok'],
    data () {
        return {
            v$: useValidate(),
            formData: [
                {
                    start: this.getDefaultDate().start,
                    stop: this.getDefaultDate().stop
                }
            ],
            isDirty: false
        }
    },
    validations () {
        return {
            formData: {
                $each: helpers.forEach({
                    start: {
                        required,
                        format: helpers.withMessage(
                            this.$t('Allowed format: YYYY-MM-DD HH:mm'),
                            (value) => this.validateDateTime(value)
                        )
                    },
                    stop: {
                        required,
                        format: helpers.withMessage(
                            this.$t('Allowed format: YYYY-MM-DD HH:mm'),
                            (value) => this.validateDateTime(value)
                        ),
                        afterStart: helpers.withMessage(
                            this.$t('End date cannot be prior to start date'),
                            (value, sibling) => this.validateDateRange(sibling.start, value)
                        )
                    }
                })
            }
        }
    },
    watch: {
        formData: {
            handler () {
                this.isDirty = true
            },
            deep: true
        }
    },
    methods: {
        addSpecialDate () {
            if (this.formData.length === 1 && this.formData[0].start === null && this.formData[0].stop === null) {
                this.formData[0] = this.getDefaultDate()
                return
            }
            this.formData.push(this.getDefaultDate())
        },
        deleteSpecialDates () {
            this.formData = [{
                start: null,
                stop: null
            }]

            this.v$.$reset()
        },
        getDefaultDate () {
            const today = new Date().toISOString().split('T')[0]
            return {
                start: `${today}T00:00:00`,
                stop: `${today}T23:59:00`
            }
        },
        getErrorMessage (index, field) {
            const errors = this.v$?.formData?.$each?.$response?.$errors
            if (!errors || !errors[index] || !errors[index][field]) {
                return null
            }

            const fieldError = errors[index][field]
            if (Array.isArray(fieldError)) {
                const errorWithMessage = fieldError.find((err) => err?.$message)
                return errorWithMessage?.$message
            }
            if (fieldError?.$message) {
                return fieldError.$message
            }

            return this.$t('Invalid input')
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

                this.$emit('ok', validSlots)
                return this.$refs.dialog.hide()
            }

            showGlobalErrorMessage(this.$t('Invalid input'))
        },
        removeSpecialDate (index) {
            if (this.formData.length > 1) {
                this.formData.splice(index, 1)
                return
            }

            this.formData[0] = {
                start: null,
                stop: null
            }
        },
        validateDateRange (startValue, endValue) {
            const startDate = new Date(startValue)
            const endDate = new Date(endValue)

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return true // Let individual field validation handle invalid dates
            }

            return startDate < endDate
        },
        validateDateTime (value) {
            const date = new Date(value)
            return !isNaN(date.getTime())
        }
    }
}
</script>
