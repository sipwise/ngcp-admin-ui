<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-header-rule-action
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
            </aui-new-header-rule-action>
        </template>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleAction from 'src/components/edit-forms/AuiNewHeaderRuleAction'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiHeaderManipulationsRuleActionCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewHeaderRuleAction
    },
    mixins: [
        headerRuleSetContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRuleAction: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRuleAction({
                payload: data,
                set_id: this.headerRuleContext ? this.headerSetContextResourceId : this.subscriberHeaderRuleContext.set_id,
                rule_id: this.headerRuleContextResourceId,
                subscriber_id: this.subscriberHeaderRuleContext ? this.subscriberContextResourceId : null
            })
            showGlobalSuccessMessage(this.$t('Header rule action created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
