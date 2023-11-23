<template>
    <aui-base-sub-context>
        <aui-new-header-manipulations
            v-if="headerRuleSetContext"
            :initial-form-data="headerRuleSetContext"
            :reseller="headerRuleSetContext.reseller_id_expand"
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
        </aui-new-header-manipulations>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewHeaderManipulations from 'components/AuiNewHeaderManipulations'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataContextPageMixin from 'src/mixins/data-context-page'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewHeaderManipulations
    },
    mixins: [
        dataContextPageMixin,
        headerRuleSetContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            updateHeaderRuleSet: WAIT_PAGE
        }),
        async update (data) {
            await this.updateHeaderRuleSet({
                id: this.headerRuleSetContext.id,
                payload: data
            })
            await this.reloadHeaderRuleSetContext()
            showGlobalSuccessMessage(this.$t('Header Rule Set saved successfully'))
        }
    }
}
</script>
