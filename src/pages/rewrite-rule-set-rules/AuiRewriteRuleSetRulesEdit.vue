<template>
    <aui-base-edit-context>
        <aui-new-rewrite-rule-set-rule
            v-if="rewriteRuleSetContext && rewriteRuleContext"
            :initial-form-data="rewriteRuleContext"
            :loading="$waitPage($wait)"
            :set-id="rewriteRuleSetContext.id"
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
        </aui-new-rewrite-rule-set-rule>
    </aui-base-edit-context>
</template>

<script>
import AuiNewRewriteRuleSetRule from 'components/edit-forms/AuiNewRewriteRuleSetRule'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
import rewriteRuleSetRulesContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set-rules'
export default {
    name: 'AuiRewriteRuleSetRulesEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewRewriteRuleSetRule
    },
    mixins: [
        rewriteRuleSetContextMixin,
        rewriteRuleSetRulesContextMixin
    ],
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            updateRewriteRule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateRewriteRule(data)
                showGlobalSuccessMessage(this.$t('Rewrite rule successfully updated'))
            } finally {
                await this.reloadRewriteRuleContext()
            }
        }
    }
}
</script>
