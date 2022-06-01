<template>
    <aui-base-edit-context>
        <aui-new-billing-network
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
        </aui-new-billing-network>
    </aui-base-edit-context>
</template>

<script>
import AuiNewBillingNetwork from 'components/edit-forms/AuiNewBillingNetwork'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiBillingNetworkEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewBillingNetwork
    },
    mixins: [subContext],
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingNetwork: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingNetwork({
                id: this.$route.params.id,
                payload: data
            })
            await this.reloadContext()
            showGlobalSuccessMessage(this.$t('Billing network successfully updated'))
        }
    }
}
</script>
