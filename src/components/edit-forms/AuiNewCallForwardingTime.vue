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
                :error="hasFieldError('name')"
                :error-message="getFieldError('name')"
                @keyup.enter="submit"
            />
        </aui-base-form-field>
        <aui-form-field-group-headline
            :headline="$t('Period')"
        />
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
                            v-model="formData.times[index].startYear"
                            dense
                            :label="$t('Year')"
                            :options="yearValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="formData.times[index].endYear"
                            dense
                            :label="$t('Through')"
                            :options="yearValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="formData.times[index].startMonth"
                            dense
                            :label="$t('Month')"
                            :options="monthValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="formData.times[index].endMonth"
                            dense
                            :label="$t('Through')"
                            :options="monthValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="formData.times[index].startDay"
                            dense
                            :label="$t('Day')"
                            :options="dayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="formData.times[index].endDay"
                            dense
                            :label="$t('Through')"
                            :options="dayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="formData.times[index].startWDay"
                            dense
                            :label="$t('Weekday')"
                            :options="weekdayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="formData.times[index].endWDay"
                            dense
                            :label="$t('Through')"
                            :options="weekdayValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="formData.times[index].startHour"
                            dense
                            :label="$t('Hour')"
                            :options="hourValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="formData.times[index].endHour"
                            dense
                            :label="$t('Through')"
                            :options="hourValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="formData.times[index].startMinute"
                            dense
                            :label="$t('Minute')"
                            :options="minuteValue"
                            map-options
                            emit-value
                            :disable="loading"
                            :error="false"
                        />
                        <q-select
                            v-model="formData.times[index].endMinute"
                            dense
                            :label="$t('Through')"
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
                            color="negative"
                            unelevated
                            dense
                            icon="delete"
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
import { required } from '@vuelidate/validators'
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
            formData: this.getInitialData
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
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
            } else {
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
</style>
