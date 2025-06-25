<template>
    <aui-base-edit-context>
        <aui-new-billing-profile
            v-if="billingProfileContext"
            :initial-form-data="billingProfileContext"
            :reseller="billingProfileContextReseller"
            :hide-reseller-select="true"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-billing-profile>
    </aui-base-edit-context>
</template>

<script>
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
export default {
    name: 'AuiBillingProfileEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewBillingProfile
    },
    mixins: [
        billingProfileContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingProfile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingProfile({
                id: this.billingProfileContextResourceId,
                payload: data
            })
            await this.reloadBillingProfileContext()
            showGlobalSuccessMessage(this.$t('Billing profile successfully updated'))
        }
    }
}
</script>
