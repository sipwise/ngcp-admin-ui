<template>
    <aui-base-sub-context>
        <aui-phonebook-form
            v-if="dataContextRootObject && dataContextObject"
            :initial-form-data="dataContextObject"
            :loading="dataContextLoading"
            :subscriber-id="dataContextRootObject.id"
            @submit="updatePhonebookEntry"
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
import dataContext from 'src/mixins/data-context'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    components: { AuiFormActionsUpdate, AuiPhonebookForm, AuiBaseSubContext },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'phonebookentries'
        },
        dataContextResourceId () {
            return this.$route.params.phonebookId
        },
        dataContextFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            createPhonebookEntry: WAIT_PAGE
        }),
        async updatePhonebookEntry (data) {
            try {
                await this.createPhonebookEntry(data)
                showGlobalSuccessMessage(this.$t('Phonebook entry saved successfully'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
