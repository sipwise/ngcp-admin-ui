<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-billing-zones
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :billing-profile-id="billingProfileContextResourceId"
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
            </aui-new-billing-zones>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiNewBillingZones from 'components/edit-forms/AuiNewBillingZones'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
export default {
    name: 'AuiBillingZonesCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewBillingZones
    },
    mixins: [
        billingProfileContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            createBillingZones: WAIT_PAGE
        }),
        async create (data) {
            await this.createBillingZones(data)
            showGlobalSuccessMessage(this.$t('Billing Zones created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
