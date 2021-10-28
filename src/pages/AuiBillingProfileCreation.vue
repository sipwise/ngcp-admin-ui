<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-billing-profile
                :initial-form-data="props.initialFormData"
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
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiBillingProfileCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewBillingProfile
    },
    methods: {
        async create () {
            // Todo: Implement creation of billing profile
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
