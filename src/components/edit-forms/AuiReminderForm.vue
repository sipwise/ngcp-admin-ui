<template>
    <aui-base-form>
        <slot
            v-if="canEdit"
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
                            :disable="!canEdit || loading"
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
                                :disable="!canEdit || loading"
                            />
                        </div>
                    </aui-base-form-field>
                    <aui-base-form-field
                        required
                    >
                        <q-input
                            v-model="formData.time"
                            :disable="!canEdit || loading"
                            :label="$t('Time')"
                            fill-mask="_"
                            mask="##:##:##"
                            :error="v$.formData.time.$errors.length > 0"
                            :error-message="$errMsg(v$.formData.time.$errors)"
                            @focus="$refs.timePopup.show()"
                            @keyup.enter="submit"
                        >
                            <template
                                #loading
                            >
                                <q-spinner-dots
                                    color="primary"
                                />
                            </template>
                            <template
                                #prepend
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
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { isTime } from 'src/validators/common'

export default {
    name: 'AuiReminderForm',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    validations () {
        return {
            formData: {
                time: {
                    required,
                    isTime
                }
            }
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        },
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
            }
            return {
                active: false,
                recur: 'never',
                time: null
            }
        }
    }
}
</script>
