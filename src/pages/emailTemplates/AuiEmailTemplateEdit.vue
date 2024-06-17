<template>
    <aui-base-edit-context>
        <aui-new-email-template
            v-if="getEmailTemplatesContext"
            :initial-form-data="getEmailTemplatesContext"
            :reseller="getEmailTemplatesContext.reseller_id_expand"
            :loading="$waitPage($wait)"
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
        </aui-new-email-template>
    </aui-base-edit-context>
</template>
<script>
import AuiNewEmailTemplate from 'components/edit-forms/AuiNewEmailTemplate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import emailTemplatesContextMixin from 'src/mixins/data-context-pages/email-templates'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiEmailTemplateEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewEmailTemplate
    },
    mixins: [
        emailTemplatesContextMixin
    ],
    props: {
        isCustomContext: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        getEmailTemplatesContext () {
            if (this.isCustomContext) {
                return this.emailTemplatesContext('emailTemplatesContextCustom')
            }
            return this.emailTemplatesContext('emailTemplatesContextDefault')
        }
    },
    methods: {
        ...mapWaitingActions('emailTemplates', {
            updateEmailTemplate: WAIT_PAGE
        }),
        async update (data) {
            await this.updateEmailTemplate({
                id: data.id,
                payload: {
                    reseller_id: data.reseller_id,
                    from_email: data.fromEmail,
                    body: data.body,
                    attachment_name: data.attachment_name,
                    name: data.name,
                    subject: data.subject
                }
            })
            if (this.isCustomContext) {
                await this.reloadEmailTemplatesContext('emailTemplatesContextCustom')
            } else {
                await this.reloadEmailTemplatesContext('emailTemplatesContextDefault')
            }
            showGlobalSuccessMessage(this.$t('Email Template successfully updated'))
        }
    }
}
</script>
