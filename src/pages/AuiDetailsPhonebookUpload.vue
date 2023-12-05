<template>
    <aui-base-sub-context>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-upload-csv
                :initial-form-data="initialFormData"
                :loading="loading"
                :label="$t('Upload phonebook')"
                @submit="create"
            >
                <template
                    #actions="{ hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-upload-csv>
        </template>
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
export default {
    name: 'AuiPhonebookEntryUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBaseSubContext
    },
    props: {
        path: {
            type: String,
            default: 'resellerphonebookentries'
        }
    },
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            uploadCsv: WAIT_PAGE
        }),
        async create (data) {
            let payload = {
                ...data,
                path: this.path
            }
            if (this.path === 'subscriberphonebookentries') {
                payload = {
                    ...payload,
                    subscriber_id: this.$route.params.id
                }
            } else if (this.path === 'customerphonebookentries') {
                payload = {
                    ...payload,
                    customer_id: this.$route.params.id
                }
            } else if (this.path === 'resellerphonebookentries') {
                payload = {
                    ...payload,
                    reseller_id: this.$route.params.id
                }
            }
            await this.uploadCsv(payload)
            showGlobalSuccessMessage(this.$t('Phonebook entry created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
