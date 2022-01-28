<template>
    <aui-base-edit-context>
        <aui-reminder-form
            v-if="resourceObject"
            :initial-form-data="reminderData"
            :loading="$waitPage()"
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
import {
    mapState
} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiReminderForm from 'components/edit-forms/AuiReminderForm'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import subContext from 'src/mixins/sub-context'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'

export default {
    name: 'AuiSubscriberDetailsReminder',
    components: {
        AuiFormActionsUpdate,
        AuiReminderForm,
        AuiBaseEditContext
    },
    mixins: [
        subContext
    ],
    data () {
        return {
        }
    },
    computed: {
        ...mapState('subscribers', [
            'reminderData'
        ]),
        subscriberId () {
            return this.resourceObject?.id
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
