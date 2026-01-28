<template>
    <div class="q-pa-xl">
        <aui-base-form
            @submit="onSubmit"
        >
            <q-stepper
                ref="stepper"
                v-model="step"
                color="primary"
                animated
                keep-alive
            >
                <q-step
                    :name="1"
                    :title="$t('Select the direction for your Header Rule')"
                    icon="settings"
                    :done="step > 1"
                >
                    <div class="row">
                        <aui-base-form-field
                            class="col"
                            required
                        >
                            <q-input
                                v-model.trim="formData.rule.name"
                                clearable
                                outlined
                                :label="$t('Name')"
                                :error="hasRuleFieldError('name')"
                                :error-message="getRuleFieldError('name')"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <aui-base-form-field
                            class="col"
                            required
                        >
                            <q-select
                                v-model="formData.rule.direction"
                                :options="ruleOptions"
                                map-options
                                emit-value
                                outlined
                                :label="$t('Direction')"
                                :disable="loading"
                                :error="hasRuleFieldError('direction')"
                                :error-message="getRuleFieldError('direction')"
                            />
                        </aui-base-form-field>
                    </div>
                </q-step>
                <q-step
                    :name="2"
                    :title="$t('Create your Conditions')"
                    icon="create_new_folder"
                    :done="step > 2"
                >
                    <aui-header-manipulations-wizard-conditions-editor
                        ref="conditionsEditor"
                        :conditions-options="conditionsOptions"
                        :match-part="matchPart"
                        :loading="loading"
                    />
                </q-step>
                <q-step
                    :name="3"
                    :title="$t('Add your Actions')"
                    icon="add_comment"
                    :done="step > 3"
                >
                    <aui-header-manipulations-wizard-actions-editor
                        ref="actionsEditor"
                        :actions-options="actionsOptions"
                        :header-part="headerPart"
                        :loading="loading"
                    />
                </q-step>
                <template #navigation>
                    <q-stepper-navigation class="row items-center full-width">
                        <q-btn
                            color="primary"
                            :label="step === 3 ? $t('Finish') : $t('Continue')"
                            @click="onNext"
                        />
                        <q-btn
                            v-if="step > 1"
                            flat
                            color="primary"
                            :label="$t('Back')"
                            class="q-ml-sm"
                            @click="onPrevious"
                        />
                        <q-space />
                        <q-btn
                            v-if="step === 1"
                            flat
                            color="primary"
                            :label="$t('Exit')"
                            @click="onExit"
                        />
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </aui-base-form>
    </div>
</template>

<script>

import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiHeaderManipulationsWizardActionsEditor from 'src/pages/header-manipulations-wizard/AuiHeaderManipulationsWizardActionsEditor'
import AuiHeaderManipulationsWizardConditionsEditor from 'src/pages/header-manipulations-wizard/AuiHeaderManipulationsWizardConditionsEditor'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'AuiHeaderManipulationsWizard',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiHeaderManipulationsWizardConditionsEditor,
        AuiHeaderManipulationsWizardActionsEditor
    },
    mixins: [baseFormMixin],
    emits: ['submit'],
    data () {
        return {
            step: 1
        }
    },
    computed: {
        ...mapGetters('headerManipulationsWizard', [
            'ruleOptions',
            'conditionsOptions',
            'actionsOptions'
        ]),
        ...mapGetters('headerRuleSets', {
            matchPart: 'matchPart',
            headerPart: 'matchPart'
        }),
        headerSetId () {
            return this.$route?.params?.id || null
        },
        getInitialData () {
            return {
                rule: {
                    name: null,
                    direction: null,
                    description: null,
                    priority: null,
                    stopper: false,
                    enabled: false,
                    subscriber_id: null,
                    set_id: null
                },
                conditions: [],
                actions: []
            }
        }
    },
    methods: {
        ...mapActions('headerRuleSets', [
            'getHeaderRulesBySetId'
        ]),
        getValidations () {
            return {
                rule: {
                    name: {
                        required
                    },
                    direction: {
                        required
                    }
                }
            }
        },
        hasRuleFieldError (field) {
            return !!this.v$?.formData?.rule?.[field] && this.v$.formData.rule[field].$errors.length > 0
        },
        getRuleFieldError (field) {
            if (this.v$?.formData?.rule?.[field]) {
                return this.$errMsg(this.v$.formData.rule[field].$errors)
            }
            return ''
        },
        validateRuleStep () {
            if (!this.v$?.formData?.rule) {
                return true
            }
            this.v$.formData.rule.$touch()
            return !this.v$.formData.rule.$invalid
        },
        validateConditionsStep () {
            return this.$refs.conditionsEditor?.validate?.() || false
        },
        validateActionsStep () {
            return this.$refs.actionsEditor?.validate?.() || false
        },
        validateStep (step) {
            if (step === 1) {
                return this.validateRuleStep()
            }
            if (step === 2) {
                return this.validateConditionsStep()
            }
            if (step === 3) {
                return this.validateActionsStep()
            }
            return true
        },
        onSubmit () {
            return this.$emit('submit')
        },
        async getNextRulePriority () {
            const rule = this.headerSetId
                ? (await this.getHeaderRulesBySetId({ set_id: this.headerSetId })) ?? []
                : []
            return rule.reduce((maxPriority, rule) => {
                const priority = Number(rule?.priority ?? -1)
                return priority > maxPriority ? priority : maxPriority
            }, -1) + 1
        },
        async onRuleFormComplete () {
            const rule = this.formData.rule
            const selectedRuleOption = this.ruleOptions.find((option) => option?.value === rule.direction)
            rule.description = `${rule.name} - ${selectedRuleOption?.label || rule.direction}`
            rule.priority = await this.getNextRulePriority()
            rule.stopper = false
            rule.enabled = true
            rule.set_id = this.headerSetId
            rule.subscriber_id = null
        },

        onConditionsFormComplete () {
            const conditionsEditor = this.$refs.conditionsEditor
            if (!conditionsEditor) {
                this.formData.conditions = []
                return
            }
            this.formData.conditions = conditionsEditor.buildPayload()
        },
        onActionsFormComplete () {
            const actionsEditor = this.$refs.actionsEditor
            if (!actionsEditor) {
                this.formData.actions = []
                return
            }
            this.formData.actions = actionsEditor.buildPayload()
        },
        async onNext () {
            if (!this.validateStep(this.step)) {
                return
            }
            if (this.step === 1) {
                await this.onRuleFormComplete()
            } else if (this.step === 2) {
                this.onConditionsFormComplete()
            } else if (this.step === 3) {
                this.onActionsFormComplete()
                this.onExit()
                console.debug(this.formData)
                return
            }
            // TODO: Remove line below
            console.debug(this.formData)
            this.$refs.stepper.next()
        },
        onPrevious () {
            this.$refs.stepper.previous()
        },
        onExit () {
            if (this.headerSetId) {
                this.$router.push({
                    name: 'headerRules',
                    params: {
                        id: this.headerSetId
                    }
                })
                return
            }
            const parentRouteName = this.$route?.meta?.parentPath?.split('.')?.[0]
            if (parentRouteName) {
                this.$router.push({ name: parentRouteName })
                return
            }
            this.$router.back()
        }
    }
}
</script>

<style scoped>
:deep(.q-stepper__tab .q-icon) {
    font-size: 15px;
    transform: translateX(-2px);
}

:deep(.wizard-field-row .q-item) {
    padding-top: 0;
    padding-bottom: 0;
}

:deep(.wizard-field-row .q-field__bottom) {
    min-height: 0;
    padding-top: 0;
}
</style>
