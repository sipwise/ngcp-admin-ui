<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-email-template
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
            </aui-new-email-template>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiNewEmailTemplate from 'src/components/edit-forms/AuiNewEmailTemplate.vue'
export default {
    name: 'AuiEmailTemplateCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewEmailTemplate
    },
    methods: {
        ...mapWaitingActions('emailTemplates', {
            createEmailTemplate: WAIT_PAGE
        }),
        async create (data) {
            await this.createEmailTemplate(data)
            showGlobalSuccessMessage(this.$t('Email Template created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
