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
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingProfile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingProfile({
                id: this.billingProfileContextResourceId,
                payload: data
            })
            await this.reloadBillingProfileContext()
            showGlobalSuccessMessage(this.$t('Billing profile successfully updated'))
        }
    }
}
</script>
