<template>
    <aui-base-sub-context>
        <aui-new-subscriber-header-rules-conditions
            v-if="subscriberHeaderRulesContext && subscriberHeaderRulesConditionsContext"
            :initial-form-data="subscriberHeaderRulesConditionsContext"
            :loading="$waitPage($wait)"
            :rule-id="subscriberHeaderRulesContext.id"
            :rewrite-rule-set="subscriberHeaderRuleConditionsContextRewriteRules"
            :conditions-id="subscriberHeaderRulesConditionsContextId"
            :reseller-id="subscriberContextReseller?.id"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-subscriber-header-rules-conditions>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewSubscriberHeaderRulesConditions from 'src/components/edit-forms/AuiNewSubscriberHeaderRulesConditions'
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberHeaderManipulationsRulesConditionsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberHeaderRulesConditions
    },
    mixins: [
        subscriberHeaderRulesContextMixin,
        headerRuleConditionsContextMixin,
        subscriberContextMixin
    ],
    async mounted () {
        await this.loadHeaderRulesConditionsContext()
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateDataSubscriberHeaderRulesConditions: WAIT_PAGE,
            getSubscriberHeaderRulesConditionsValues: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateDataSubscriberHeaderRulesConditions({
                    id: this.subscriberHeaderRulesConditionsContextId,
                    set_id: this.subscriberHeaderRulesContext.set_id,
                    rule_id: this.subscriberHeaderRulesContext.id,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Successfully updated header rule conditions'))
            } finally {
                await this.getSubscriberHeaderRulesConditionsValues({ id: this.subscriberHeaderRulesConditionsContextId })
                await this.reloadSubscriberHeaderRulesConditionsContext()
            }
        }
    }
}
</script>
