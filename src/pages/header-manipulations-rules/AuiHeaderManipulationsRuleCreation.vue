<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-header-rule
                v-if="headerSetContext"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :set-id="headerSetContextResourceId"
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
            </aui-new-header-rule>
        </template>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRule from 'src/components/edit-forms/AuiNewHeaderRule'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
export default {
    name: 'AuiHeaderManipulationsRuleCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewHeaderRule
    },
    mixins: [
        headerRuleSetContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRule: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRule({
                payload: data,
                set_id: this.headerSetContextResourceId
            })
            showGlobalSuccessMessage(this.$t('Header rule created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
