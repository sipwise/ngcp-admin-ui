<template>
    <aui-base-sub-context>
        <aui-new-header-manipulations
            v-if="headerSetContext"
            :initial-form-data="headerSetContext"
            :reseller="headerSetContext.reseller_id_expand"
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
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewHeaderManipulations from 'components/AuiNewHeaderManipulations'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import { mapWaitingActions } from 'vue-wait'
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
                id: this.headerSetContextResourceId,
                payload: data
            })
            await this.reloadHeaderSetContext()
            showGlobalSuccessMessage(this.$t('Header set created successfully'))
        }
    }
}
</script>
