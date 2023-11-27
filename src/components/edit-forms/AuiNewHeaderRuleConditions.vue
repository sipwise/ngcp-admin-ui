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
                <q-select
                    v-model="formData.match_type"
                    :options="matchType"
                    data-cy="headerruleconditions-matchType"
                    emit-value
                    map-options
                    dense
                    :label="$t('Match')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.match_part"
                    :options="matchPart"
                    data-cy="headerruleconditions-matchPart"
                    emit-value
                    map-options
                    dense
                    :label="$t('Part')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.match_name"
                    clearable
                    dense
                    :label="$t('Name')"
                    data-cy="headerruleconditions-matchPart"
                    :error="hasFieldError('match_name')"
                    :error-message="getFieldError('match_name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.expression"
                    :options="expression"
                    data-cy="headerruleconditions-expression"
                    emit-value
                    map-options
                    dense
                    :label="$t('Expression')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.expression_negation"
                    :label="$t('Expression negation')"
                    data-cy="headerruleconditions-expressionNegation"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.value_type"
                    :options="valueType"
                    data-cy="headerruleconditions-valueType"
                    emit-value
                    map-options
                    dense
                    :label="$t('Type')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <div
                class="col-6"
            >
                <aui-base-form-field>
                    <aui-select-rewrite-rule-set
                        v-model="formData.rwr_set_id"
                        data-cy="headerruleconditions-rwrSetId"
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
                    data-cy="headerruleconditions-rewriterules"
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
                    data-cy="headerruleconditions-enabled"
                    :disable="loading"
                />
            </aui-base-form-field>
            <q-list
                dense
            >
                <q-item-label
                    header
                    class="text-uppercase"
                >
                    {{ $t('Value') }}
                </q-item-label>
                <q-item
                    v-for="(value, index) in allValues"
                    :key="index"
                >
                    <q-item-section>
                        <div
                            class="row q-col-gutter-x-sm"
                        >
                            <div
                                class="col-6"
                            >
                                <q-input
                                    v-model.trim="formData.values[index]"
                                    clearable
                                    dense
                                    data-cy="headerruleconditions-value"
                                    :disable="loading"
                                    @keyup.enter="submit"
                                />
                            </div>
                            <div
                                class="col-6"
                            >
                                <br>
                                <q-btn
                                    color="negative"
                                    unelevated
                                    dense
                                    icon="delete"
                                    size="sm"
                                    :disable="loading"
                                    @click="deleteValue(index)"
                                />
                            </div>
                        </div>
                    </q-item-section>
                </q-item>
                <br>
                <q-item>
                    <q-item-section
                        class="aui-list-item-section-button"
                        side
                    >
                        <q-btn
                            :label="$t('Add Value')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addValue"
                        />
                    </q-item-section>
                </q-item>
            </q-list>
        </template>
    </aui-base-form>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectRewriteRuleSet from 'components/AuiSelectRewriteRuleSet'
export default {
    name: 'AuiNewHeaderRuleConditions',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectRewriteRuleSet
    },
    mixins: [baseFormMixin],
    props: {
        ruleId: {
            type: Number,
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
                match_name: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters('headerRuleSets', [
            'matchType',
            'matchPart',
            'expression',
            'valueType',
            'rewriterules'
        ]),
        allValues () {
            const values = []
            this.formData.values.forEach((value) => {
                values.push(value)
            })
            return values
        },
        rewriteInitialOption () {
            if (this.rewriteRuleSet) {
                return {
                    label: this.rewriteRuleSet.name,
                    value: this.rewriteRuleSet.id
                }
            } else {
                return null
            }
        },
        getDefaultData () {
            return {
                values: [],
                rwr_set_id: null,
                match_type: 'header',
                match_part: 'full',
                match_name: '',
                expression: 'is',
                expression_negation: false,
                value_type: 'input',
                enabled: true,
                rule_id: this.ruleId

            }
        }
    },
    methods: {
        addValue () {
            this.formData.values.push([])
        },
        deleteValue (index) {
            this.formData.values.splice(index, 1)
        }
    }
}
</script>
