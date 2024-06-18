<template>
    <aui-base-sub-context>
        <aui-new-header-rule-actions
            v-if="subscriberHeaderRulesContext && subscriberHeaderRulesActionsContext"
            :initial-form-data="subscriberHeaderRulesActionsContext"
            :loading="$waitPage($wait)"
            :rule-id="subscriberHeaderRulesContext.id"
            :rewrite-rule-set="subscriberHeaderRuleActionsContextRewriteRules"
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
        </aui-new-header-rule-actions>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleActions from 'src/components/edit-forms/AuiNewHeaderRuleActions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsHeaderManipulationsRulesActionsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleActions
    },
    mixins: [
        headerRuleSetContextMixin,
        headerRuleActionsContextMixin,
        subscriberHeaderRulesContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateDataSubscriberHeaderRulesActions: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateDataSubscriberHeaderRulesActions({
                    id: this.subscriberHeaderRuleActionsContextId,
                    set_id: this.subscriberHeaderRulesContext.set_id,
                    rule_id: this.subscriberHeaderRulesContext.id,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Successfully updated header rule actions'))
            } finally {
                await this.reloadSubscriberHeaderRulesActionsContext()
            }
        }
    }
}
</script>
