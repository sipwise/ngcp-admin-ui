<template>
    <aui-base-sub-context>
        <aui-new-header-rule-condition
            v-if="isValuesContextLoaded && subscriberHeaderRuleContext && subscriberHeaderRuleConditionContext"
            :initial-form-data="subscriberHeaderRuleConditionContext"
            :loading="$waitPage($wait)"
            :rule-id="headerRuleContextResourceId"
            :rewrite-rule-set="subscriberHeaderRuleConditionContextRewriteRules"
            :condition-id="subscriberHeaderRuleConditionContextId"
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
        </aui-new-header-rule-condition>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleCondition from 'src/components/edit-forms/AuiNewHeaderRuleCondition'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsHeaderRuleConditionEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleCondition
    },
    mixins: [
        subscriberHeaderRulesContextMixin,
        headerRuleConditionsContextMixin,
        subscriberContextMixin
    ],
    data () {
        return {
            isValuesContextLoaded: false
        }
    },
    async mounted () {
        if (this.subscriberHeaderRuleConditionContextId && this.subscriberContextResourceId) {
            await this.getHeaderRuleConditionValues({
                id: this.subscriberHeaderRuleConditionContextId,
                subscriber_id: this.subscriberContextResourceId
            })
        }
        this.isValuesContextLoaded = true
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleCondition: WAIT_PAGE,
            getHeaderRuleConditionValues: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRuleCondition({
                    id: this.subscriberHeaderRuleConditionContextId,
                    set_id: this.subscriberHeaderRuleContext.set_id,
                    rule_id: this.headerRuleContextResourceId,
                    subscriber_id: this.subscriberContextResourceId,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Header rule condition updated successfully'))
            } finally {
                await this.getHeaderRuleConditionValues({
                    id: this.subscriberHeaderRuleConditionContextId,
                    subscriber_id: this.subscriberContextResourceId
                })
                await this.reloadSubscriberHeaderRuleConditionContext()
            }
        }
    }
}
</script>
