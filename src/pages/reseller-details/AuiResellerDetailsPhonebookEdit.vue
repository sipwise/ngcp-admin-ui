<template>
    <aui-base-sub-context>
        <aui-phonebook-form
            v-if="dataContextRootObject && dataContextObject"
            :initial-form-data="dataContextObject"
            :loading="dataContextLoading"
            :reseller-id="dataContextRootObject.id"
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
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiPhonebookForm from 'components/edit-forms/AuiPhonebookForm'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContext from 'src/mixins/data-context'
import { mapWaitingActions } from 'vue-wait'
export default {
    components: { AuiFormActionsUpdate, AuiPhonebookForm, AuiBaseSubContext },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'resellerphonebookentries'
        },
        dataContextResourceId () {
            return this.$route.params.phonebookId
        },
        dataContextFilters () {
            return {
                reseller_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            updatePhonebookEntry: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updatePhonebookEntry(data)
                showGlobalSuccessMessage(this.$t('Phonebook entry saved successfully'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
