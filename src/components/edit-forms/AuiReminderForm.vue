<template>
    <aui-base-form>
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <aui-base-form-field>
                        <q-toggle
                            v-model="formData.active"
                            :disable="loading"
                            :label="$t('Enable reminder')"
                            checked-icon="notifications_active"
                            unchecked-icon="notifications_off"
                        />
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <div
                            class="q-gutter-sm"
                        >
                            <q-radio
                                v-for="(recurrenceOption, index) in recurrenceOptions"
                                :key="index"
                                v-model="formData.recur"
                                :val="recurrenceOption.value"
                                :label="recurrenceOption.label"
                                :disable="loading"
                            />
                        </div>
                    </aui-base-form-field>
                    <aui-base-form-field
                        required
                    >
                        <q-input
                            v-model="formData.time"
                            :disable="loading"
                            :label="$t('Time')"
                            fill-mask="_"
                            mask="##:##:##"
                            :error="$v.formData.time.$error"
                            :error-message="$errMsg($v.formData.time)"
                            @blur="$v.formData.time.$touch()"
                            @focus="$refs.timePopup.show()"
                        >
                            <template
                                v-slot:loading
                            >
                                <q-spinner-dots
                                    color="primary"
                                />
                            </template>
                            <template
                                v-slot:prepend
                            >
                                <q-btn
                                    icon="access_alarm"
                                    color="primary"
                                    flat
                                    dense
                                >
                                    <q-popup-proxy
                                        ref="timePopup"
                                    >
                                        <q-time
                                            v-model="formData.time"
                                            format24h
                                            now-btn
                                            flat
                                            mask="HH:mm:ss"
                                            color="primary"
                                        >
                                            <div class="row items-center justify-end">
                                                <q-btn
                                                    v-close-popup
                                                    flat
                                                    color="primary"
                                                    :label="$t('Close')"
                                                />
                                            </div>
                                        </q-time>
                                    </q-popup-proxy>
                                </q-btn>
                            </template>
                        </q-input>
                    </aui-base-form-field>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import { isTime } from 'src/validators/common'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'

export default {
    name: 'AuiReminderForm',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    validations: {
        formData: {
            time: {
                required,
                isTime
            }
        }
    },
    computed: {
        recurrenceOptions () {
            return [
                {
                    label: this.$t('Only once'),
                    value: 'never',
                    icon: 'looks_one'
                },
                {
                    label: this.$t('On weekdays'),
                    value: 'weekdays'
                },
                {
                    label: this.$t('Always'),
                    value: 'always'
                }
            ]
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    active: this.initialFormData.active,
                    recur: this.initialFormData.recur,
                    time: this.initialFormData.time
                }
            } else {
                return {
                    active: false,
                    recur: 'never',
                    time: null
                }
            }
        }
    }
}
</script>
