<template>
    <aui-base-sub-context>
        <aui-new-subscriber-header-manipulations
            v-if="headerRuleSetContextContext && headerRulesContext"
            :initial-form-data="headerRulesContext"
            :loading="$waitPage($wait)"
            :set-id="headerRuleSetContextContext.id"
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
        </aui-new-subscriber-header-manipulations>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewSubscriberHeaderManipulations from 'src/components/edit-forms/AuiNewSubscriberHeaderManipulations'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsRulesEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberHeaderManipulations    
    },
    mixins: [
        headerRuleSetContextMixin
    ],
    async mounted () {
        await this.loadHeaderRulesContext()
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateHeaderRule({
                    id: this.headerRulesContext.id,
                    payload: data
                })
                showGlobalSuccessMessage(this.$t('Successfully updated header rule'))
            } finally {
                await this.reloadHeaderRulesContext()
            }
        }
    }
}
</script>
