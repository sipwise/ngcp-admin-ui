<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-billing-profile
                :initial-form-data="initialFormData"
                :loading="$waitPage()"
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
            </aui-new-billing-profile>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
export default {
    name: 'AuiBillingProfileCreation',
    components: {
        AuiNewBillingProfile,
        AuiBaseAddPage,
        AuiFormActionsCreation
    },
    methods: {
        ...mapWaitingActions('billing', {
            createBillingProfile: WAIT_PAGE
        }),
        async create (data) {
            await this.createBillingProfile(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Billing profile created successfully'))
        }
    }
}
</script>
