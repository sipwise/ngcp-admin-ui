<template>
    <aui-base-edit-context>
        <aui-new-sound-sets
            v-if="customerContext && customerSoundSetsContext"
            :initial-form-data="getInitialFormData"
            :is-customer-details="true"
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
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewSoundSets from 'components/edit-forms/AuiNewSoundSets'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsSoundSetEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewSoundSets
    },
    mixins: [
        soundSetsContextMixin,
        customerContextMixin
    ],
    computed: {
        getInitialFormData () {
            return {
                id: this.customerSoundSetsContext.id,
                reseller_id: this.customerSoundSetsContext.reseller_id,
                customer_id: this.customerContext?.id,
                name: this.customerSoundSetsContext.name,
                parent_id: this.customerSoundSetsContextParentId,
                parent_name: this.customerSoundSetsContextParentName,
                description: this.customerSoundSetsContext.description,
                expose_to_customer: this.customerSoundSetsContext.expose_to_customer,
                contract_default: this.customerSoundSetsContext.contract_default
            }
        }
    },
    methods: {
        ...mapWaitingActions('soundSets', {
            updateSoundSets: WAIT_PAGE
        }),
        async update (data) {
            await this.updateSoundSets({
                id: this.customerSoundSetsContext.id,
                payload: data
            })
            await this.reloadCustomerSoundSetsContext()
            showGlobalSuccessMessage(this.$t('Sound Sets successfully updated'))
        }
    }
}
</script>
