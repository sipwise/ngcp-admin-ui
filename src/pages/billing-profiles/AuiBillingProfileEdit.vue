<template>
    <aui-base-edit-context>
        <aui-new-billing-profile
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :reseller="resourceObject.reseller_id_expand"
            :loading="$waitPage()"
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
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiBillingProfileEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewBillingProfile
    },
    mixins: [subContext],
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingProfile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingProfile({
                id: this.$route.params.billingProfileId,
                payload: data
            })
            await this.reloadContext()
            showGlobalSuccessMessage(this.$t('Billing profile successfully updated'))
        }
    }
}
</script>
