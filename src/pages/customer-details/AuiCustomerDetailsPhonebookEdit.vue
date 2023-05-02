<template>
    <aui-base-sub-context>
        <aui-phonebook-form
            v-if="customerContext && customerPhonebookContext"
            :initial-form-data="customerPhonebookContext"
            :loading="$waitPage($wait)"
            :customer-id="customerContext.id"
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
        </aui-phonebook-form>
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import customerPhonebookContextMixin from 'src/mixins/data-context-pages/customer-details-phonebook'
export default {
    components: {
        AuiFormActionsUpdate,
        AuiPhonebookForm,
        AuiBaseSubContext
    },
    mixins: [
        customerContextMixin,
        customerPhonebookContextMixin
    ],
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            updatePhonebookEntry: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updatePhonebookEntry(data)
                showGlobalSuccessMessage(this.$t('Phonebook entry saved successfully'))
            } finally {
                await this.reloadCustomerPhonebookContext()
            }
        }
    }
}
</script>
