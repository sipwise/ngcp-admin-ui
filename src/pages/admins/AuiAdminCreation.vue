<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-admin
                :initial-form-data="props.initialFormData"
                :enable-password="true"
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
            </aui-new-admin>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiAdminCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewAdmin
    },
    methods: {
        ...mapWaitingActions('administrators', {
            createAdministrator: WAIT_PAGE
        }),
        async create (data) {
            await this.createAdministrator(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Administrator created successfully'))
        }
    }
}
</script>
