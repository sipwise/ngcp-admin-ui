<template>
    <aui-base-sub-context>
        <aui-new-header-rule-condition
            v-if="headerRuleConditionContext"
            :initial-form-data="headerRuleConditionContext"
            :loading="$waitPage($wait)"
            :rule-id="headerRuleContextResourceId"
            :rewrite-rule-set="headerRuleConditionContextRewriteRules"
            :reseller-id="headerRuleContextReseller"
            :condition-id="headerRuleConditionContextResourceId"
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
import AuiNewHeaderRuleCondition from 'components/edit-forms/AuiNewHeaderRuleCondition'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiHeaderManipulationsRuleConditionEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRuleCondition
    },
    mixins: [
        headerRuleSetContextMixin,
        headerRuleConditionsContextMixin
    ],
    async mounted () {
        if (this.headerRuleConditionContextResourceId) {
            await this.getHeaderRuleConditionValues({ id: this.headerRuleConditionContextResourceId })
        }
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleCondition: WAIT_PAGE,
            getHeaderRuleConditionValues: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRuleCondition({
                    id: this.headerRuleConditionContextResourceId,
                    set_id: this.headerSetContextResourceId,
                    rule_id: this.headerRuleContextResourceId,
                    subscriber_id: null,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Header rule condition updated successfully'))
            } finally {
                await this.getHeaderRuleConditionValues({
                    id: this.headerRuleConditionContextResourceId,
                    subscriber_id: null
                })
                await this.reloadHeaderRuleConditionContext()
            }
        }
    }
}
</script>
