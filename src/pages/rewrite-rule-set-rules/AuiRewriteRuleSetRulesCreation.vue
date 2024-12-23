<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-rewrite-rule-set-rule
                v-if="rewriteRuleSetContext"
                :initial-form-data="initialFormData"
                :direction="direction"
                :field="field"
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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewRewriteRuleSetRule from 'components/edit-forms/AuiNewRewriteRuleSetRule'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
import { mapWaitingActions } from 'vue-wait'
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
    props: {
        direction: {
            type: String,
            default: 'in'
        },
        field: {
            type: String,
            default: 'callee'
        }
    },
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
