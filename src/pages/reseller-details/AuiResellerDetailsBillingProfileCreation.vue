<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-billing-profile
                :initial-form-data="props.initialFormData"
                :reseller-id="Number(id)"
                :loading="$waitPage($wait)"
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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiResellerDetailsBillingProfileCreation',
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
            showGlobalSuccessMessage(this.$t('Billing profile created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
