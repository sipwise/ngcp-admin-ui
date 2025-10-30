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
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.match_pattern"
                    dense
                    clearable
                    :label="$t('Match pattern')"
                    data-cy="rewrite-rule-match_pattern"
                    :disable="loading"
                    :error="hasFieldError('match_pattern')"
                    :error-message="getFieldError('match_pattern')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('Match pattern, a PCRE regular expression.') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.replace_pattern"
                    dense
                    clearable
                    :label="$t('Replacement Pattern')"
                    data-cy="rewrite-rule-replace_pattern"
                    :disable="loading"
                    :error="hasFieldError('replace_pattern')"
                    :error-message="getFieldError('replace_pattern')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.description"
                    dense
                    clearable
                    :label="$t('Description')"
                    data-cy="rewrite-rule-description"
                    :disable="loading"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('Arbitrary text.') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.direction"
                    :options="directionList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Direction')"
                    data-cy="rewrite-rule-direction"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.field"
                    :options="fieldList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Field')"
                    data-cy="rewrite-rule-field"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="rewrite-rule-enabled"
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
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewRewriteRuleSetRule',
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
        setId: {
            type: Number,
            default: null
        },
        direction: {
            type: String,
            default: 'in'
        },
        field: {
            type: String,
            default: 'callee'
        }
    },
    validations () {
        return {
            formData: {
                match_pattern: {
                    required,
                    isValidRegExp (value) {
                        try {
                            // eslint-disable-next-line no-new
                            new RegExp(value)
                            return true
                        } catch (e) {
                            return false
                        }
                    }
                },
                replace_pattern: {
                    required
                },
                description: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters('rewriteRuleSets', [
            'directionList',
            'fieldList'
        ]),
        getInitialData () {
            return {
                match_pattern: this.initialFormData?.match_pattern || null,
                replace_pattern: this.initialFormData?.replace_pattern || null,
                description: this.initialFormData?.description || null,
                direction: this.initialFormData?.direction || this.direction,
                field: this.initialFormData?.field || this.field,
                enabled: this.initialFormData?.enabled ?? true,
                priority: this.initialFormData?.priority || null,
                set_id: this.setId
            }
        }
    }
}
</script>
