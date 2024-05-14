<template>
    <aui-base-sub-context>
        <aui-new-header-rule-actions
            v-if="headerRuleSetContext && headerRulesContext && headerRuleActionsContext"
            :initial-form-data="headerRuleActionsContext"
            :loading="$waitPage($wait)"
            :rule-id="headerRulesContext.id"
            :rewrite-rule-set="headerRuleActionsContextRewriteRules"
            :reseller-id="headerRulesContextReseller"
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
export default {
    name: 'AuiHeaderManipulationsRulesConditionsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleActions
    },
    mixins: [
        headerRuleSetContextMixin,
        headerRuleActionsContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleActions: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRuleActions({
                    id: this.headerRuleActionsContext.id,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Successfully updated header rule actions'))
            } finally {
                await this.reloadHeaderRulesActionsContext()
            }
        }
    }
}
</script>
