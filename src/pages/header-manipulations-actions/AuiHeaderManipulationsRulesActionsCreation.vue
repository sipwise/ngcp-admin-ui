<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-header-rule-actions
                v-if="headerRulesContext || subscriberHeaderRulesContext"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :rule-id="headerRulesContext ? headerRulesContext.id : subscriberHeaderRulesContext.id"
                :reseller-id="headerRulesContextReseller || subscriberContextReseller?.id"
                @submit="create"
            >
                <template
                    #actions="{ loading, hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-header-rule-actions>
        </template>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleActions from 'src/components/edit-forms/AuiNewHeaderRuleActions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiHeaderManipulationsRulesActionsCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewHeaderRuleActions
    },
    mixins: [
        headerRuleSetContextMixin,
        subscriberHeaderRulesContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRuleActions: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRuleActions(data)
            showGlobalSuccessMessage(this.$t('Header Rule Actions created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
