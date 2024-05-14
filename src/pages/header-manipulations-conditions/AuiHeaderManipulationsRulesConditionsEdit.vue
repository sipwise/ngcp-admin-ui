<template>
    <aui-base-sub-context>
        <aui-new-header-rule-conditions
            v-if="headerRuleSetContext && headerRulesContext && headerRuleConditionsContext"
            :initial-form-data="headerRuleConditionsContext"
            :loading="$waitPage($wait)"
            :rule-id="headerRulesContext.id"
            :rewrite-rule-set="headerRuleConditionsContextRewriteRules"
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
        </aui-new-header-rule-conditions>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleConditions from 'src/components/edit-forms/AuiNewHeaderRuleConditions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
export default {
    name: 'AuiHeaderManipulationsRulesConditionsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleConditions
    },
    mixins: [
        headerRuleSetContextMixin,
        headerRuleConditionsContextMixin
    ],
    async mounted () {
        await this.loadHeaderRulesConditionsContext()
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleConditions: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRuleConditions({
                    id: this.headerRuleConditionsContext.id,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Successfully updated header rule conditions'))
            } finally {
                await this.reloadHeaderRulesConditionsContext()
            }
        }
    }
}
</script>
