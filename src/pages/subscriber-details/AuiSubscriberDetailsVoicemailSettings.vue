<template>
    <aui-base-edit-context>
        <aui-subscriber-voicemail-settings-form
            v-if="resourceObject"
            :initial-form-data="voicemailSettings"
            :subscriber-id="subscriberId"
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
        </aui-subscriber-voicemail-settings-form>
    </aui-base-edit-context>
</template>

<script>
import {
    mapState
} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import subContext from 'src/mixins/sub-context'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiSubscriberVoicemailSettingsForm from 'components/edit-forms/AuiSubscriberVoicemailSettingsForm'

export default {
    name: 'AuiSubscriberDetailsVoicemailSettings',
    components: {
        AuiSubscriberVoicemailSettingsForm,
        AuiFormActionsUpdate,
        AuiBaseEditContext
    },
    mixins: [
        subContext
    ],
    computed: {
        ...mapState('subscribers', [
            'voicemailSettings'
        ]),
        subscriberId () {
            return this.resourceObject?.id
        }
    },
    watch: {
        async subscriberId () {
            await this.reload()
        }
    },
    async mounted () {
        await this.reload()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            loadVoicemailSettings: WAIT_PAGE,
            updateVoicemailSettings: WAIT_PAGE
        }),
        async reload () {
            if (this.subscriberId) {
                await this.loadVoicemailSettings(this.subscriberId)
            }
        },
        async update (data) {
            await this.updateVoicemailSettings({
                ...data,
                subscriber_id: this.subscriberId
            })
            await this.reload()
            showGlobalSuccessMessage(this.$t('Voicemail Settings updated successfully'))
        }
    }
}
</script>
