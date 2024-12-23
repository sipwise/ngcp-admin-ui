<template>
    <aui-base-sub-context>
        <aui-phonebook-form
            v-if="subscriberContext && subscriberPhonebookContext"
            :initial-form-data="subscriberPhonebookContext"
            :loading="$waitPage($wait)"
            :subscriber-id="subscriberContext.id"
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
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberPhonebookContextMixin from 'src/mixins/data-context-pages/subscriber-details-phonebook'
import { mapWaitingActions } from 'vue-wait'
export default {
    components: {
        AuiFormActionsUpdate,
        AuiPhonebookForm,
        AuiBaseSubContext
    },
    mixins: [
        subscriberContextMixin,
        subscriberPhonebookContextMixin
    ],
    async mounted () {
        await this.loadSubscriberPhonebookContext()
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
                await this.reloadSubscriberPhonebookContext()
            }
        }
    }
}
</script>
