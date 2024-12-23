<template>
    <aui-base-form
        :layout="$attrs.layout || '6-6'"
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
                    v-model.trim="formData.priority"
                    clearable
                    dense
                    :label="$t('Priority')"
                    data-cy="headerruleactions-priority"
                    :error="hasFieldError('priority')"
                    :error-message="getFieldError('priority')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.header"
                    clearable
                    dense
                    :label="$t('Header')"
                    data-cy="headerruleactions-header"
                    :error="hasFieldError('header')"
                    :error-message="getFieldError('header')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.header_part"
                    :options="matchPart"
                    data-cy="headerruleactions-headerPart"
                    emit-value
                    map-options
                    dense
                    :label="$t('Header Part')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.action_type"
                    :options="actionType"
                    data-cy="headerruleactions-actionType"
                    emit-value
                    map-options
                    dense
                    :label="$t('Type')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.value_part"
                    :options="matchPart"
                    data-cy="headerruleactions-valuePart"
                    emit-value
                    map-options
                    dense
                    :label="$t('Value Part')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.value"
                    clearable
                    dense
                    :label="$t('Value')"
                    data-cy="headerruleactions-value"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <br>
            <div
                class="col-6"
            >
                <aui-base-form-field>
                    <aui-select-rewrite-rule-set
                        v-model="formData.rwr_set_id"
                        data-cy="headerruleactions-rwrSetId"
                        :reseller-id="resellerId"
                        :initial-option="rewriteInitialOption"
                    />
                </aui-base-form-field>
            </div>
            <br>
            <aui-base-form-field>
                <q-select
                    v-model="formData.rwr_dp"
                    :options="rewriterules"
                    data-cy="headerruleactions-rewriterules"
                    emit-value
                    map-options
                    dense
                    :label="$t('Rewrite Rules')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="headerruleactions-enabled"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    integer,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectRewriteRuleSet from 'components/AuiSelectRewriteRuleSet'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewHeaderRuleAction',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectRewriteRuleSet
    },
    mixins: [baseFormMixin],
    props: {
        ruleId: {
            type: String,
            default: null
        },
        rewriteRuleSet: {
            type: Object,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                priority: {
                    integer
                },
                header: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters('headerRuleSets', [
            'matchPart',
            'actionType',
            'rewriterules'
        ]),
        rewriteInitialOption () {
            if (this.rewriteRuleSet) {
                return {
                    label: this.rewriteRuleSet.name,
                    value: this.rewriteRuleSet.id
                }
            }
            return null
        },
        getDefaultData () {
            return {
                value: '',
                rwr_set_id: null,
                header_part: 'full',
                header: '',
                action_type: 'set',
                value_part: 'full',
                enabled: true,
                rule_id: this.ruleId

            }
        }
    }
}
</script>
