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
import { mapActions } from 'vuex'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiAdminCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewAdmin
    },
    methods: {
        ...mapActions('administrators', [
            'createAdministrator'
        ]),
        async create (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createAdministrator(data)
                this.$goBack()
                showGlobalSuccessMessage(this.$t('Administrator created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
