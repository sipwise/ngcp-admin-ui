<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-header-rule-condition
                v-if="headerRuleContext || subscriberHeaderRuleContext"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :rule-id="headerRuleContextResourceId"
                :reseller-id="headerRuleContextReseller || subscriberContextReseller?.id"
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
            </aui-new-header-rule-condition>
        </template>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewHeaderRuleCondition from 'components/edit-forms/AuiNewHeaderRuleCondition'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiHeaderManipulationsRuleConditionCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewHeaderRuleCondition
    },
    mixins: [
        headerRuleSetContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRuleCondition: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRuleCondition({
                payload: data,
                set_id: this.headerRuleContext ? this.headerSetContextResourceId : this.subscriberHeaderRuleContext?.set_id,
                rule_id: this.headerRuleContextResourceId,
                subscriber_id: this.subscriberHeaderRuleContext ? this.subscriberContextResourceId : null
            })
            showGlobalSuccessMessage(this.$t('Header rule condition created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
