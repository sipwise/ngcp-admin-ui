<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-billing-profile
                :initial-form-data="props.initialFormData"
                :reseller-id="Number(id)"
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
    </aui-base-sub-context>
</template>

<script>
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiBillingProfileCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewBillingProfile
    },
    props: {
        id: {
            type: [String, Number],
            default: null
        }
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
