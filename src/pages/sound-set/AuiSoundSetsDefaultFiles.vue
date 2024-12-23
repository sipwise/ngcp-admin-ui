<template>
    <aui-base-edit-context>
        <aui-sound-sets-default-files-form
            v-if="soundSetsContext"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{
                    loading,
                    hasInvalidData,
                    hasUnsavedData,
                    submit
                }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
                    @submit="submit"
                />
            </template>
        </aui-sound-sets-default-files-form>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiSoundSetsDefaultFilesForm from 'components/edit-forms/AuiSoundSetDefaultFilesForm'
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
        AuiSoundSetsDefaultFilesForm
    },
    mixins: [
        soundSetsContextMixin,
        dataContextPageMixin
    ],
    methods: {
        ...mapWaitingActions('soundSets', {
            updateSoundSets: WAIT_PAGE
        }),
        async update (data) {
            const contextData = {
                contract_default: this.soundSetsContext.contract_default,
                customer_id: this.soundSetsContext.customer_id,
                description: this.soundSetsContext.description,
                expose_to_customer: this.soundSetsContext.expose_to_customer,
                name: this.soundSetsContext.name,
                parent_id: this.soundSetsContext.parent_id,
                parent_name: this.soundSetsContext.parent_name,
                reseller_id: this.soundSetsContext.reseller_id
            }

            await this.updateSoundSets({
                id: this.soundSetsContext.id,
                payload: { ...contextData, ...data }
            })
            showGlobalSuccessMessage(this.$t('Load Default Files successfully updated'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
