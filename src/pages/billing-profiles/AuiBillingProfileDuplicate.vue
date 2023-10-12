<template>
    <aui-base-sub-context>
        <div
            class="proxy-warning q-pa-xs text-left q-pb-lg"
        >
            <q-icon
                name="warning"
                size="xs"
                color="warning"
            />
            {{ $t('Billing fees will not be duplicated.') }}
        </div>
        <aui-new-billing-profile
            v-if="billingProfileContext"
            :initial-form-data="billingProfileContext"
            :reseller="billingProfileContextReseller"
            :is-clone="true"
            :loading="$waitPage($wait)"
            @submit="duplicate"
        >
            <template
                #actions="{ loading, hasInvalidData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="true"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-billing-profile>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
export default {
    name: 'AuiBillingProfileDuplicate',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewBillingProfile
    },
    mixins: [billingProfileContextMixin],
    methods: {
        ...mapWaitingActions('billing', {
            duplicateBillingProfiles: WAIT_PAGE
        }),
        async duplicate (data) {
            await this.duplicateBillingProfiles(data)
            showGlobalSuccessMessage(this.$t('Billing Profile duplicated successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
