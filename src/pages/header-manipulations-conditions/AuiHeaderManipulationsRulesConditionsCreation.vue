<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-header-rule-conditions
                v-if="headerRulesContext"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :rule-id="headerRulesContext.id"
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
            </aui-new-header-rule-conditions>
        </template>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRuleConditions from 'src/components/edit-forms/AuiNewHeaderRuleConditions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsRulesConditionsCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewHeaderRuleConditions
    },
    mixins: [
        headerRuleSetContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRuleConditions: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRuleConditions(data)
            showGlobalSuccessMessage(this.$t('Header Rule Conditions created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
