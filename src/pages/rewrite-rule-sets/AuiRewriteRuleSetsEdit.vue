<template>
    <aui-base-sub-context>
        <aui-new-rewrite-rule-sets
            v-if="rewriteRuleSet"
            :initial-form-data="rewriteRuleSet"
            :reseller="rewriteRuleSet.reseller_id_expand"
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
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiRewriteRuleSetsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewRewriteRuleSets
    },
    mixins: [dataContextPageMixin],
    data () {
        return {
            rewriteRuleSet: null
        }
    },
    computed: {
        rewriteRuleSetContext () {
            return this.getDataContextObject('rewriteRuleSetContext')
        }
    },
    watch: {
        rewriteRuleSetContext () {
            if (this.rewriteRuleSetContext) {
                this.getRewriteRuleSet()
            }
        }
    },
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            updateRewriteRuleSet: WAIT_PAGE,
            getRewriteRules: WAIT_PAGE
        }),
        async getRewriteRuleSet () {
            const rewriteRules = await this.getRewriteRules({
                set_id: this.rewriteRuleSetContext.id
            })
            this.rewriteRuleSet = {
                ...this.rewriteRuleSetContext,
                // eslint-disable-next-line camelcase
                rules: rewriteRules.data.items.map(({ id, set_id, ...allFields }) => allFields)
            }
        },
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
