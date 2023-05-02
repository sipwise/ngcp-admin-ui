<template>
    <aui-base-edit-context>
        <aui-new-ncos-level-carrier
            v-if="ncoslevelContext && ncoslevelCarrierContext"
            :initial-form-data="ncoslevelCarrierContext"
            :loading="$waitPage($wait)"
            :ncos-level-id="ncoslevelContext.id"
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
        </aui-new-ncos-level-carrier>
    </aui-base-edit-context>
</template>

<script>
import AuiNewNcosLevelCarrier from 'components/edit-forms/AuiNewNCOSLevelCarrier'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
import ncoslevelCarrierContextMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier'
export default {
    name: 'AuiNCOSLevelsDetailsLnpCarrierEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewNcosLevelCarrier
    },
    mixins: [
        ncoslevelContextMixin,
        ncoslevelCarrierContextMixin
    ],
    methods: {
        ...mapWaitingActions('ncosLevels', {
            updateNCOSLevelCarrier: WAIT_PAGE
        }),
        async update (data) {
            try {
                const payload = {
                    description: data.description,
                    carrier_id: data.carrier_id,
                    ncos_level_id: data.ncos_level_id
                }
                await this.updateNCOSLevelCarrier({ id: data.id, payload })
                showGlobalSuccessMessage(this.$t('NCOS lnp entry successfully updated'))
            } finally {
                await this.reloadNcoslevelCarrierContext()
            }
        }
    }
}
</script>
