<template>
    <aui-base-edit-context>
        <aui-new-sound-sets
            v-if="soundSetsContext"
            :initial-form-data="soundSetsContext"
            :reseller="soundSetsContextReseller"
            :customer="soundSetsContextContact"
            :customer-id="soundSetsContextCustomer"
            :parent-id="soundSetsContextParentId"
            :parent="soundSetsContextParent"
            :isdefault-files="true"
            :isnotdefault-files="false"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, submit }"
            >
                <aui-form-actions-update
                    :isnotdefault-files="false"
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
                    @submit="submit"
                />
            </template>
        </aui-new-sound-sets>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewSoundSets from 'components/edit-forms/AuiNewSoundSets'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSoundSetsDefaultFiles',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewSoundSets
    },
    mixins: [
        soundSetsContextMixin,
        dataContextPageMixin
    ],
    async mounted () {
        this.reloadReminderData(this.$route.params.id)
    },
    methods: {
        ...mapWaitingActions('soundSets', {
            updateSoundSets: WAIT_PAGE,
            getAllSoundHandles: WAIT_PAGE,
            getAllSoundFiles: WAIT_PAGE
        }),
        async reloadReminderData (soundSetId) {
            await this.getAllSoundHandles()
            await this.getAllSoundFiles({ set_id: soundSetId })
        },
        async update (data) {
            await this.updateSoundSets({
                id: this.soundSetsContext.id,
                payload: data
            })
            await this.reloadReminderData(this.soundSetsContext.id)
            showGlobalSuccessMessage(this.$t('Load Default Files successfully updated'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
