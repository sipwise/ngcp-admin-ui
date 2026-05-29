<template>
    <aui-base-sub-context>
        <aui-new-rewrite-rule-sets
            v-if="rewriteRuleSetContext"
            :initial-form-data="rewriteRuleSetContext"
            :reseller="rewriteRuleSetContext.reseller_id_expand"
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
        </aui-new-rewrite-rule-sets>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewRewriteRuleSets from 'components/edit-forms/AuiNewRewriteRuleSets'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiRewriteRuleSetsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewRewriteRuleSets
    },
    mixins: [rewriteRuleSetContextMixin],
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            updateRewriteRuleSet: WAIT_PAGE
        }),
        async update (data) {
            await this.updateRewriteRuleSet({
                id: this.rewriteRuleSetContext.id,
                payload: data
            })
            await this.reloadRewriteRuleSetContext()
            showGlobalSuccessMessage(this.$t('Rewrite Rule Set saved successfully'))
        }
    }
}
</script>
