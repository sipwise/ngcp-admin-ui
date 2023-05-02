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
        <template #col-1>
            <aui-base-form-field>
                <q-select
                    v-model="formData.field"
                    :options="inboundFieldList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Match Field')"
                    data-cy="inbound-field"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.pattern"
                    dense
                    clearable
                    :label="$t('Pattern')"
                    data-cy="inbound-pattern"
                    :disable="loading"
                    :error="hasFieldError('pattern')"
                    :error-message="getFieldError('pattern')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('A PCRE regex matching against the specified field (e.g. "^sip:.+{\'@\'}example\.org$" or "^sip:431") when matching against a full URI') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.reject_code"
                    dense
                    clearable
                    :label="$t('Reject code')"
                    data-cy="inbound-reject_code"
                    :disable="loading"
                    :error="hasFieldError('reject_code')"
                    :error-message="getFieldError('reject_code')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('if specified, the call is rejected if the source IP of the request is found in a peering server of the group, but the given pattern does not match; Range of 400-699') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.reject_reason"
                    dense
                    clearable
                    :label="$t('Reject reason')"
                    data-cy="inbound-reject_reason"
                    :disable="loading"
                    :error="hasFieldError('reject_reason')"
                    :error-message="getFieldError('reject_reason')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('if reject code is specified and the call is rejected, the reason in the response is taken from this value') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.priority"
                    dense
                    clearable
                    :label="$t('Priority')"
                    data-cy="inbound-priority"
                    :disable="loading"
                    :error="hasFieldError('priority')"
                    :error-message="getFieldError('priority')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('e.g: "50" ') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="inbound-enabled"
                    :disable="loading"
                />
                <q-tooltip>
                    {{ $t('Rule enabled state.') }}
                </q-tooltip>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import { mapGetters } from 'vuex'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import useValidate from '@vuelidate/core'
import {
    required,
    integer,
    minValue,
    maxValue
} from '@vuelidate/validators'
export default {
    name: 'AuiNewPeeringInbound',
    components: {
        AuiBaseForm,
        AuiBaseFormField
    },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        groupId: {
            type: Number,
            default: null
        }

    },
    validations () {
        return {
            formData: {
                pattern: {
                    required
                },
                reject_code: {
                    minValue: minValue(400),
                    maxValue: maxValue(699),
                    integer
                },
                priority: {
                    required,
                    integer
                }
            }
        }
    },
    data () {
        return {
            v$: useValidate(),
            formData: this.getInitialData
        }
    },
    computed: {
        ...mapGetters('peering', [
            'inboundFieldList'
        ]),
        getInitialData () {
            if (this.initialFormData) {
                return {
                    field: this.initialFormData.field,
                    pattern: this.initialFormData.pattern,
                    reject_code: this.initialFormData.reject_code,
                    reject_reason: this.initialFormData.reject_reason,
                    enabled: this.initialFormData.enabled,
                    priority: this.initialFormData.priority,
                    group_id: this.groupId
                }
            } else {
                return {
                    field: 'from_user',
                    priority: '',
                    pattern: null,
                    reject_code: null,
                    reject_reason: null,
                    enabled: true,
                    group_id: this.groupId
                }
            }
        }
    }
}
</script>
