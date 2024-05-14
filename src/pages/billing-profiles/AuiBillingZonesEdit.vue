<template>
    <aui-base-sub-context>
        <aui-new-billing-zones
            v-if="billingProfileContext && billingZoneContext"
            :initial-form-data="billingZoneContext"
            :loading="$waitPage($wait)"
            :billing-profile-id="billingProfileContextResourceId"
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
        </aui-new-billing-zones>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewBillingZones from 'components/edit-forms/AuiNewBillingZones'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
import billingZoneContextMixin from 'src/mixins/data-context-pages/billing-zones'
export default {
    name: 'AuiBillingZonesEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewBillingZones
    },
    mixins: [
        billingProfileContextMixin,
        billingZoneContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingZones: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingZones({
                id: this.billingZoneContextId,
                payload: data
            })
            await this.reloadDataContext('billingZoneContext')
            showGlobalSuccessMessage(this.$t('Billing Zones saved successfully'))
        }
    }
}
</script>
