<template>
    <aui-base-add-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-phonebook-form
                v-if="customerContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :customer-id="customerContext.id"
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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsPhonebookCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddContext,
        AuiPhonebookForm
    },
    mixins: [
        customerContextMixin
    ],
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            createPhonebookEntry: WAIT_PAGE
        }),
        async create (data) {
            await this.createPhonebookEntry(data)
            showGlobalSuccessMessage(this.$t('Phonebook entry created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
