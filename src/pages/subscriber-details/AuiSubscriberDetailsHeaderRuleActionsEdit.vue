<template>
    <aui-base-sub-context>
        <aui-new-header-rule-action
            v-if="subscriberHeaderRuleContext && subscriberHeaderRuleActionContext"
            :initial-form-data="subscriberHeaderRuleActionContext"
            :loading="$waitPage($wait)"
            :rule-id="headerRuleContextResourceId"
            :rewrite-rule-set="subscriberHeaderRuleActionContextRewriteRules"
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
        </aui-new-header-rule-action>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleAction from 'src/components/edit-forms/AuiNewHeaderRuleAction'
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsHeaderRuleActionsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleAction
    },
    mixins: [
        headerRuleActionsContextMixin,
        subscriberHeaderRulesContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleAction: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRuleAction({
                    id: this.subscriberHeaderRuleActionContextId,
                    set_id: this.subscriberHeaderRuleContext.set_id,
                    rule_id: this.headerRuleContextResourceId,
                    subscriber_id: this.subscriberContextResourceId,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Header rule action updated successfully'))
            } finally {
                await this.reloadSubscriberHeaderRuleActionContext()
            }
        }
    }
}
</script>
