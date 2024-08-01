<template>
    <aui-base-sub-context>
        <aui-new-header-rule
            v-if="subscriberContext && subscriberHeaderRuleContext"
            :initial-form-data="subscriberHeaderRuleContext"
            :loading="$waitPage($wait)"
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
        </aui-new-header-rule>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRule from 'src/components/edit-forms/AuiNewHeaderRule'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
export default {
    name: 'AuiSubscriberDetailsHeaderRuleEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRule
    },
    mixins: [
        subscriberContextMixin,
        subscriberHeaderRulesContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateSubscriberHeaderRule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberHeaderRule({
                    id: this.headerRuleContextResourceId,
                    data: data,
                    subscriber_id: this.subscriberContextResourceId
                })
                showGlobalSuccessMessage(this.$t('Header rule updated successfully'))
            } finally {
                await this.reloadSubscriberHeaderRuleContext()
            }
        }
    }
}
</script>
