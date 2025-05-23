<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-phonebook-form
                :initial-form-data="initialFormData"
                :loading="loading"
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
            </aui-phonebook-form>
        </template>
    </aui-base-add-page>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPhonebookEntryCreation',
    components: {
        AuiPhonebookForm,
        AuiFormActionsCreation,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            createPhonebookEntry: WAIT_PAGE
        }),
        async create (data) {
            delete data.shared
            await this.createPhonebookEntry(data)
            showGlobalSuccessMessage(this.$t('Phonebook entry created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
