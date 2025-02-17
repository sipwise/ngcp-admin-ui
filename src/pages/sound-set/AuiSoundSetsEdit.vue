<template>
    <aui-base-edit-context>
        <aui-new-sound-sets
            v-if="soundSetsContext"
            :initial-form-data="getInitialFormData"
            :reseller="soundSetsContextReseller"

            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-sound-sets>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSoundSets from 'components/edit-forms/AuiNewSoundSets'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
export default {
    name: 'AuiSoundSetsEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewSoundSets
    },
    mixins: [
        soundSetsContextMixin
    ],
    computed: {
        getInitialFormData () {
            return {
                id: this.soundSetsContext.id,
                reseller_id: this.soundSetsContext.reseller_id,
                customer_id: this.soundSetsContextCustomer?.id,
                customer_email: this.soundSetsContextContact?.email,
                name: this.soundSetsContext.name,
                parent_id: this.soundSetsContextParentId,
                parent_name: this.soundSetsContextParentName,
                description: this.soundSetsContext.description,
                expose_to_customer: this.soundSetsContext.expose_to_customer,
                contract_default: this.soundSetsContext.contract_default
            }
        }
    },
    methods: {
        ...mapWaitingActions('soundSets', {
            updateSoundSets: WAIT_PAGE
        }),
        async update (data) {
            await this.updateSoundSets({
                id: this.soundSetsContext.id,
                payload: data
            })
            await this.reloadSoundSetsContext()
            showGlobalSuccessMessage(this.$t('Sound Sets successfully updated'))
        }
    }
}
</script>
