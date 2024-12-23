<template>
    <aui-base-edit-context>
        <aui-reminder-form
            v-if="subscriberContext"
            :initial-form-data="reminderData"
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
                    :close-button="false"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-reminder-form>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiReminderForm from 'components/edit-forms/AuiReminderForm'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'

export default {
    name: 'AuiSubscriberDetailsReminder',
    components: {
        AuiFormActionsUpdate,
        AuiReminderForm,
        AuiBaseEditContext
    },
    mixins: [
        subscriberContextMixin
    ],
    computed: {
        ...mapState('subscribers', [
            'reminderData'
        ]),
        subscriberId () {
            return this.subscriberContext?.id
        }
    },
    watch: {
        async subscriberId () {
            await this.reloadReminderData()
        }
    },
    async mounted () {
        await this.reloadReminderData()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            loadReminder: WAIT_PAGE,
            updateReminder: WAIT_PAGE
        }),
        async reloadReminderData () {
            if (this.subscriberId) {
                await this.loadReminder(this.subscriberId)
            }
        },
        async update (data) {
            await this.updateReminder({
                ...data,
                subscriber_id: this.subscriberId
            })
            await this.reloadReminderData()
            showGlobalSuccessMessage(this.$t('Reminder updated successfully'))
        }
    }
}
</script>
