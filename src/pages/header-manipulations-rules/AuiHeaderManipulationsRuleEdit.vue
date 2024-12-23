<template>
    <aui-base-sub-context>
        <aui-new-header-rule
            v-if="headerSetContext && headerRuleContext"
            :initial-form-data="headerRuleContext"
            :loading="$waitPage($wait)"
            :set-id="headerSetContextResourceId"
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
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRule from 'src/components/edit-forms/AuiNewHeaderRule'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiHeaderManipulationsRuleEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderRule
    },
    mixins: [
        headerRuleSetContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRule({
                    set_id: this.headerSetContextResourceId,
                    id: this.headerRuleContextResourceId,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Header rule updated successfully'))
            } finally {
                await this.reloadHeaderRuleContext()
            }
        }
    }
}
</script>
