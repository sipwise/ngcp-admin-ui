<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-rewrite-rule-set-rule
                v-if="rewriteRuleSetContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :set-id="rewriteRuleSetContext.id"
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
            </aui-new-rewrite-rule-set-rule>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewRewriteRuleSetRule from 'components/edit-forms/AuiNewRewriteRuleSetRule'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
export default {
    name: 'AuiRewriteRuleSetRulesCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewRewriteRuleSetRule
    },
    mixins: [
        rewriteRuleSetContextMixin
    ],
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            createRewriteRule: WAIT_PAGE
        }),
        async create (data) {
            await this.createRewriteRule(data)
            showGlobalSuccessMessage(this.$t('Rewrite rule successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
