<template>
    <aui-base-sub-context>
        <aui-new-header-rule-action
            v-if="headerSetContext && headerRuleContext && headerRuleActionContext"
            :initial-form-data="headerRuleActionContext"
            :loading="$waitPage($wait)"
            :rule-id="headerRuleContextResourceId"
            :rewrite-rule-set="headerRuleActionContextRewriteRules"
            :reseller-id="headerRuleContextReseller"
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
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleAction from 'src/components/edit-forms/AuiNewHeaderRuleAction'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiHeaderManipulationsRuleConditionEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleAction
    },
    mixins: [
        headerRuleSetContextMixin,
        headerRuleActionsContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleAction: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRuleAction({
                    id: this.headerRuleActionContext.id,
                    set_id: this.headerSetContextResourceId,
                    rule_id: this.headerRuleContextResourceId,
                    subscriber_id: null,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Header rule action updated successfully'))
            } finally {
                await this.reloadHeaderRuleActionContext()
            }
        }
    }
}
</script>
