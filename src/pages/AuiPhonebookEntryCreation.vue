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
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
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
            await this.createPhonebookEntry(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Phonebook entry created successfully'))
        }
    }
}
</script>
