<template>
    <aui-base-sub-context>
        <aui-new-rewrite-rule-sets
            v-if="rewriteRuleSet"
            :initial-form-data="rewriteRuleSet"
            :reseller="rewriteRuleSet.reseller_id_expand"
            :loading="$waitPage()"
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
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewRewriteRuleSets from 'components/edit-forms/AuiNewRewriteRuleSets'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    name: 'AuiRewriteRuleSetsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewRewriteRuleSets
    },
    mixins: [dataContextPageMixin],
    computed: {
        rewriteRuleSet () {
            return this.getDataContextObject('rewriteRuleSetContext')
        }
    },
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            updateRewriteRuleSet: WAIT_PAGE
        }),
        async update (data) {
            await this.updateRewriteRuleSet({
                id: this.rewriteRuleSet.id,
                payload: data
            })
            await this.reloadDataContext('rewriteRuleSetContext')
            showGlobalSuccessMessage(this.$t('Rewrite Rule Set saved successfully'))
        }
    }
}
</script>
