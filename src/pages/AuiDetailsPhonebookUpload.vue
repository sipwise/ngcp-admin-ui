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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDetailsPhonebookUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBaseSubContext
    },
    props: {
        path: {
            type: String,
            default: null
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
            if (this.path === 'v2/subscribers/phonebook') {
                payload = {
                    ...payload,
                    subscriber_id: this.$route.params.id
                }
            } else if (this.path === 'v2/customers/phonebook') {
                payload = {
                    ...payload,
                    customer_id: this.$route.params.id
                }
            } else if (this.path === 'v2/resellers/phonebook') {
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
