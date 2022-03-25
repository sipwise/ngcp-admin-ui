<template>
    <aui-base-add-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-phonebook-form
                v-if="resourceObject"
                :initial-form-data="initialFormData"
                :loading="$waitPage()"
                :customer-id="resourceObject.id"
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
            </aui-phonebook-form>
        </template>
    </aui-base-add-context>
</template>

<script>
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import subContext from 'src/mixins/sub-context'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiCustomerDetailsPhonebookCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddContext,
        AuiPhonebookForm
    },
    mixins: [
        subContext
    ],
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
