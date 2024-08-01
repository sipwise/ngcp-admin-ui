<template>
    <aui-base-form
        layout="6"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <aui-base-form-field
            required
        >
            <q-input
                v-model.trim="formData.name"
                clearable
                dense
                :disable="loading"
                :label="$t('Name')"
                data-cy="aui-create-timeset-name"
                :error="hasFieldError('name')"
                :error-message="getFieldError('name')"
                @keyup.enter="submit"
            />
        </aui-base-form-field>
        <aui-form-field-group-headline
            :headline="$t('Period*')"
        />
        <div
            v-if="showPeriodError"
            class="error-message"
        >
            Period is required to be filled.
        </div>
        <aui-base-form-field>
            <template
                v-if="formData.times && formData.times.length > 0"
            >
                <q-item
                    v-for="(time, index) in formData.times"
                    :key="index"
                    class="green-border"
                >
                    <q-item-section>
                        <q-select
                            v-model="time.startYear"
                            dense
                            :label="$t('Year')"
                            data-cy="aui-create-timeset-year"
                            :options="yearValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="time.endYear"
                            dense
                            :label="$t('Through')"
                            data-cy="aui-create-timeset-year-through"
                            :options="yearValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="time.startMonth"
                            dense
                            :label="$t('Month')"
                            data-cy="aui-create-timeset-month"
                            :options="monthValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="time.endMonth"
                            dense
                            data-cy="aui-create-timeset-month-through"
                            :options="monthValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="time.startDay"
                            dense
                            :label="$t('Day')"
                            data-cy="aui-create-timeset-day"
                            :options="dayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="time.endDay"
                            dense
                            :label="$t('Through')"
                            data-cy="aui-create-timeset-day-through"
                            :options="dayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="time.startWDay"
                            dense
                            :label="$t('Weekday')"
                            data-cy="aui-create-timeset-weekday"
                            :options="weekdayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="time.endWDay"
                            dense
                            :label="$t('Through')"
                            data-cy="aui-create-timeset-weekday-through"
                            :options="weekdayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="time.startHour"
                            dense
                            :label="$t('Hour')"
                            data-cy="aui-create-timeset-hour"
                            :options="hourValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="time.endHour"
                            dense
                            :label="$t('Through')"
                            data-cy="aui-create-timeset-hour-through"
                            :options="hourValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="time.startMinute"
                            dense
                            :label="$t('Minute')"
                            data-cy="aui-create-timeset-minute"
                            :options="minuteValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="time.endMinute"
                            dense
                            :label="$t('Through')"
                            data-cy="aui-create-timeset-through"
                            :options="minuteValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section
                        side
                    >
                        <q-btn
                            v-if="index > 0"
                            color="negative"
                            unelevated
                            dense
                            icon="delete"
                            data-cy="aui-create-timeset-period-delete"
                            size="sm"
                            :disable="loading"
                            @click="deleteTime(index)"
                        />
                    </q-item-section>
                </q-item>
            </template>
            <q-item
                class="no-padding"
            >
                <q-item-section
                    class="aui-list-item-section-button"
                    side
                >
                    <q-btn
                        :label="$t('Add another period')"
                        data-cy="aui-create-timeset-add-period"
                        color="primary"
                        icon="add"
                        size="sm"
                        unelevated
                        outline
                        :disable="loading"
                        @click="addTime"
                    />
                </q-item-section>
            </q-item>
        </aui-base-form-field>
    </aui-base-form>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import useValidate from '@vuelidate/core'
import { required, requiredIf } from '@vuelidate/validators'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
export default {
    name: 'AuiNewCallForwardingTime',
    components: { AuiBaseFormField, AuiBaseForm, AuiFormFieldGroupHeadline },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        subscriberId: {
            type: Number,
            default: null
        }
    },
    emits: ['remove'],
    data () {
        return {
            v$: useValidate(),
            formData: {
                times: []
            },
            showPeriodError: false
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
                },
                times: {
                    required: requiredIf(function () { return !this.allTimesAreEmpty() })
                }
            }
        }
    },
    computed: {
        ...mapGetters('subscribers', [
            'yearValue',
            'monthValue',
            'dayValue',
            'weekdayValue',
            'hourValue',
            'minuteValue'
        ]),
        getInitialData () {
            if (this.initialFormData) {
                return {
                    name: this.initialFormData.name,
                    times: this.initialFormData.times,
                    subscriber_id: this.subscriberId
                }
            }

            return {
                name: '',
                times: [
                    {
                        startYear: '',
                        endYear: '',
                        startMonth: '',
                        endMonth: '',
                        startDay: '',
                        endDay: '',
                        startWDay: '',
                        endWDay: '',
                        startHour: '',
                        endHour: '',
                        startMinute: '',
                        endMinute: ''
                    }
                ],
                subscriber_id: this.subscriberId
            }
        }
    },
    methods: {
        addTime () {
            this.formData.times.push({
                startYear: '',
                endYear: '',
                startMonth: '',
                endMonth: '',
                startDay: '',
                endDay: '',
                startWDay: '',
                endWDay: '',
                startHour: '',
                endHour: '',
                startMinute: '',
                endMinute: ''
            })
        },
        deleteTime (index) {
            this.formData.times.splice(index, 1)
        },
        allTimesAreEmpty () {
            return this.formData.times.every(time =>
                time.startYear === '' && time.endYear === '' &&
                time.startMonth === '' && time.endMonth === '' &&
                time.startDay === '' && time.endDay === '' &&
                time.startWDay === '' && time.endWDay === '' &&
                time.startHour === '' && time.endHour === '' &&
                time.startMinute === '' && time.endMinute === ''
            )
        },
        submit () {
            this.v$.$touch()
            if (this.allTimesAreEmpty()) {
                this.showPeriodError = true
            } else {
                this.showPeriodError = false
                if (!this.hasInvalidData || (this.hasEntityData && this.hasUnsavedData && !this.hasInvalidData)) {
                    const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                    this.$emit('submit', data, {
                        ...this.additionalSubmitData()
                    })
                }
            }
        }
    }
}
</script>
<style>
.green-border {
    border: 1px solid green;
    padding: 2%;
    margin: 1%;
    border-radius: 7px;
}
.error-message {
    color: red;
}
</style>
