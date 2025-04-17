<template>
    <aui-base-edit-context>
        <aui-sound-sets-default-files-form
            v-if="customerContext && customerSoundSetsContext"
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
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsSoundSetDefaultFiles',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiSoundSetsDefaultFilesForm
    },
    mixins: [
        soundSetsContextMixin,
        dataContextPageMixin,
        customerContextMixin
    ],
    methods: {
        ...mapWaitingActions('soundSets',
            {
                updateSoundSets: WAIT_PAGE
            }),
        async update (data) {
            const contextData = {
                contract_default: this.customerSoundSetsContext.contract_default,
                customer_id: this.customerSoundSetsContext.customer_id,
                description: this.customerSoundSetsContext.description,
                expose_to_customer: this.customerSoundSetsContext.expose_to_customer,
                name: this.customerSoundSetsContext.name,
                parent_id: this.customerSoundSetsContext.parent_id,
                parent_name: this.customerSoundSetsContext.parent_name,
                reseller_id: this.customerSoundSetsContext.reseller_id
            }

            await this.updateSoundSets({
                id: this.customerSoundSetsContext.id,
                payload: { ...contextData, ...data }
            })
            showGlobalSuccessMessage(this.$t('Load Default Files successfully updated'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
