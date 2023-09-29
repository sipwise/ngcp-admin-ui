<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-profile
                :initial-form-data="props.initialFormData"
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
            </aui-new-profile>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewProfile from 'components/edit-forms/AuiNewProfile'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiProfilePackageCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewProfile,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('billing', {
            createProfilePackages: WAIT_PAGE
        }),
        async create (data) {
            await this.createProfilePackages(data)
            showGlobalSuccessMessage(this.$t('Profile Packages created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
