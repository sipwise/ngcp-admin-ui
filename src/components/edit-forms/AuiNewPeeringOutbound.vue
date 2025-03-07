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
                <q-input
                    v-model.trim="formData.callee_prefix"
                    dense
                    clearable
                    :label="$t('Callee prefix')"
                    data-cy="outbound-callee_prefix"
                    :disable="loading"
                    :error="hasFieldError('callee_prefix')"
                    :error-message="getFieldError('callee_prefix')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('Callee prefix, eg: 43.') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.callee_pattern"
                    dense
                    clearable
                    :label="$t('Callee pattern')"
                    data-cy="outbound-callee_pattern"
                    :disable="loading"
                    :error="hasFieldError('callee_pattern')"
                    :error-message="getFieldError('callee_pattern')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('A PCRE regex matching against the full Request-URI (e.g. "^sip:.+{\'@\'}example\.org$" or "^sip:431")') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.caller_pattern"
                    dense
                    clearable
                    :label="$t('Caller pattern')"
                    data-cy="outbound-caller_pattern"
                    :disable="loading"
                    :error="hasFieldError('caller_pattern')"
                    :error-message="getFieldError('caller_pattern')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('A PCRE regex matching against "sip:user{\'@\'}domain" (e.g. "^sip:.+{\'@\'}example\.org$"" matching the whole URI, or "999" matching if the URI contains "999")') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.description"
                    dense
                    clearable
                    :label="$t('Description')"
                    data-cy="outbound-description"
                    :disable="loading"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('Rule description.') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="outbound-enabled"
                    :disable="loading"
                />
                <q-tooltip>
                    {{ $t('Rule enabled state.') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.stopper"
                    :label="$t('Stopper')"
                    data-cy="outbound-stopper"
                    :disable="loading"
                />
                <q-tooltip>
                    {{ $t('Stop processing of further rules if this rule matches.') }}
                </q-tooltip>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import { maxLength, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewPeeringOutbound',
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
                description: {
                    required
                },
                callee_prefix: {
                    maxLength: maxLength(16)
                }
            }
        }
    },
    computed: {
        getInitialData () {
            return {
                callee_prefix: this.initialFormData?.callee_prefix || '',
                callee_pattern: this.initialFormData?.callee_pattern || null,
                caller_pattern: this.initialFormData?.caller_pattern || null,
                description: this.initialFormData?.description || null,
                enabled: this.initialFormData?.enabled || true,
                stopper: this.initialFormData?.stopper || false,
                group_id: this.groupId
            }
        }
    }
}
</script>
