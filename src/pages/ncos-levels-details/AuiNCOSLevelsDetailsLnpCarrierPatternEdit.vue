<template>
    <aui-base-edit-context>
        <aui-new-ncos-level-pattern
            v-if="ncoslevelCarrierContext && ncoslevelCarrierPatternContext"
            :initial-form-data="ncoslevelCarrierPatternContext"
            :loading="$waitPage($wait)"
            :ncos-lnp-list-id="ncoslevelCarrierContext.id"
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
        </aui-new-ncos-level-pattern>
    </aui-base-edit-context>
</template>

<script>
import AuiNewNcosLevelPattern from 'components/edit-forms/AuiNewNCOSLevelPattern'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import ncoslevelCarrierContextMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier'
import ncoslevelCarrierPatternMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier-pattern'
export default {
    name: 'AuiNCOSLevelsDetailsLnpCarrierPatternEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewNcosLevelPattern
    },
    mixins: [
        ncoslevelCarrierContextMixin,
        ncoslevelCarrierPatternMixin
    ],
    methods: {
        ...mapWaitingActions('ncosLevels', {
            updateNCOSLevelCarrierPattern: WAIT_PAGE
        }),
        async update (data) {
            try {
                const payload = {
                    description: data.description,
                    pattern: data.pattern,
                    ncos_lnp_list_id: data.ncos_lnp_list_id
                }
                await this.updateNCOSLevelCarrierPattern({ id: data.id, payload })
                showGlobalSuccessMessage(this.$t('NCOS pattern successfully updated'))
            } finally {
                await this.reloadNcoslevelCarrierPatternContext()
            }
        }
    }
}
</script>
