<template>
    <aui-base-form
        layout="6-6"
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
        <template
            #col-1
        >
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.contactUri"
                    clearable
                    dense
                    :label="$t('Contact URI')"
                    :error="v$.formData.contactUri.$errors.length > 0"
                    :error-message="$errMsg(v$.formData.contactUri.$errors)"
                    data-cy="contacturi-field"
                    :disable="loading"
                    class="aui-required"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t("The SIP URI pointing to the current contact of the subscriber. Should be a full sip uri, sip:user{'@'}ip:port") }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.priority"
                    clearable
                    dense
                    mask="#.##"
                    fill-mask="0"
                    :rules="priorityRules"
                    :label="$t('Priority')"
                    data-cy="priority-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The contact priority for serial forking (float value, higher is stronger) between 0 and 1.00') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model.trim="formData.outboundSocket"
                    :options="data"
                    dense
                    :label="$t('Outbound socket')"
                    data-cy="outboundsocket-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('Points to the LB interface from which the incoming calls to this registration should be sent out') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiSubscriberNewRegisteredDevice',
    components: {
        AuiBaseForm, AuiBaseFormField
    },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                contactUri: {
                    required
                },
                priority: {
                    required
                },
                outboundSocket: {
                    required
                }
            }
        }
    },
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    contactUri: this.initialFormData.contactUri
                }
            } else {
                return {
                    contactUri: '',
                    priority: 1,
                    outboundSocket: ['default']
                }
            }
        },
        data () {
            return ['default']
        },
        priorityRules (val) {
            return [
                val => (val !== null && val !== '') || 'Please set the priority',
                val => (val >= 0 && val <= 1) || 'Please set the priority value between 0 and 1'
            ]
        }

    }
}
</script>
