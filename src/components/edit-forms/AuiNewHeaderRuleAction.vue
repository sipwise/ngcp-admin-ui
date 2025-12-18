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
            <aui-base-form-field
                style="padding: 0 0 14px"
            >
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="headerruleactions-enabled"
                    :disable="loading"
                />
            </aui-base-form-field>
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
                    :label="$t('Subject')"
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
                    :label="$t('Subject Part')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                style="padding-bottom: 20px"
            >
                <q-select
                    v-model="formData.action_type"
                    :options="actionType"
                    data-cy="headerruleactions-actionType"
                    emit-value
                    map-options
                    dense
                    :label="$t('Action Type')"
                    :hint="actionTypeHints"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                style="padding-bottom: 22px"
            >
                <q-input
                    v-model.trim="formData.value"
                    clearable
                    dense
                    :label="$t('New Value')"
                    data-cy="headerruleactions-value"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="shouldShowNewValuePart"
            >
                <q-select
                    v-model="formData.value_part"
                    style="padding-bottom: 20px"
                    :options="matchPart"
                    data-cy="headerruleactions-valuePart"
                    emit-value
                    map-options
                    dense
                    :label="$t('New Value Part')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                style="padding-bottom: 20px"
            >
                <aui-select-rewrite-rule-set
                    v-model="formData.rwr_set_id"
                    data-cy="headerruleactions-rwrSetId"
                    :reseller-id="resellerId"
                    :initial-option="rewriteInitialOption"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="shouldShowRewriteRule"
            >
                <q-select
                    v-model="formData.rwr_dp"
                    style="padding-bottom: 20px"
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
        },
        shouldShowNewValuePart () {
            return !['set', 'add', 'remove', 'rsub'].includes(this.formData.action_type)
        },
        shouldShowRewriteRule () {
            return this.formData.rwr_set_id
        },
        actionTypeHints () {
            switch (this.formData.action_type) {
            case 'set':
                return this.$t('SelectionHintSet')
            case 'add':
                return this.$t('SelectionHintAdd')
            case 'remove':
                return this.$t('SelectionHintRemove')
            case 'rsub':
                return this.$t('SelectionHintRsub')
            case 'header':
                return this.$t('SelectionHintHeader')
            case 'preference':
                return this.$t('SelectionHintPreference')
            default:
                return ''
            }
        }
    }
}
</script>
