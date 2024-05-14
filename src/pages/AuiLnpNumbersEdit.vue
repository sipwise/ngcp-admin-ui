<template>
    <aui-base-sub-context>
        <aui-new-lnp-numbers
            v-if="lnpCarrierContext && lnpNumbersContext"
            :initial-form-data="lnpNumbersContext"
            :loading="$waitPage($wait)"
            :carrier="lnpCarrierContextResourceId"
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
        </aui-new-lnp-numbers>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewLnpNumbers from 'components/edit-forms/AuiNewLnpNumbers'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
import lnpNumbersContextMixin from 'src/mixins/data-context-pages/lnp-numbers'
export default {
    name: 'AuiLnpNumbersEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewLnpNumbers
    },
    mixins: [
        lnpCarrierContextMixin,
        lnpNumbersContextMixin
    ],
    methods: {
        ...mapWaitingActions('lnp', {
            updateLnpNumbers: WAIT_PAGE
        }),
        async update (data) {
            await this.updateLnpNumbers({
                id: this.lnpNumbersContextId,
                payload: data
            })
            await this.reloadDataContext('lnpNumbersContext')
            showGlobalSuccessMessage(this.$t('Lnp Numbers saved successfully'))
        }
    }
}
</script>
