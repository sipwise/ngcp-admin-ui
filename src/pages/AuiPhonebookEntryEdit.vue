<template>
    <aui-base-edit-context>
        <aui-phonebook-form
            v-if="phonebookEntryContext"
            :initial-form-data="phonebookEntryContext"
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
        </aui-phonebook-form>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPhonebookEntryEdit',
    components: { AuiFormActionsUpdate, AuiPhonebookForm, AuiBaseEditContext },
    mixins: [dataContextPageMixin],
    computed: {
        phonebookEntryContext () {
            return this.getDataContextObject('phonebookEntryContext')
        }
    },
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            updatePhonebookEntry: WAIT_PAGE
        }),
        async update (data) {
            await this.updatePhonebookEntry(data)
            await this.reloadDataContext('phonebookEntryContext')
            showGlobalSuccessMessage(this.$t('Phonebook entry saved successfully'))
        }
    }
}
</script>
