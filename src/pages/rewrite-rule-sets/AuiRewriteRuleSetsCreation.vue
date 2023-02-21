<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-rewrite-rule-sets
                :initial-form-data="props.initialFormData"
                :loading="$waitPage()"
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
            </aui-new-rewrite-rule-sets>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewRewriteRuleSets from 'components/edit-forms/AuiNewRewriteRuleSets'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiRewriteRuleSetsCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewRewriteRuleSets,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            createRewriteRuleSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createRewriteRuleSet(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Rewrite Rule Set created successfully'))
        }
    }
}
</script>
