<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-header-manipulations
                v-if="headerRuleSetContext"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :set-id="headerRuleSetContext.id"
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
            </aui-new-subscriber-header-manipulations>
        </template>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewSubscriberHeaderManipulations from 'src/components/edit-forms/AuiNewSubscriberHeaderManipulations'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsRulesCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewSubscriberHeaderManipulations
    },
    mixins: [
        headerRuleSetContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRule: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRule(data)
            showGlobalSuccessMessage(this.$t('Header Rule created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
