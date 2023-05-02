<template>
    <aui-base-edit-context>
        <aui-new-peering-outbound
            v-if="peeringContext && peeringOutboundContext"
            :initial-form-data="peeringOutboundContext"
            :loading="$waitPage($wait)"
            :group-id="peeringContext.id"
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
        </aui-new-peering-outbound>
    </aui-base-edit-context>
</template>

<script>
import AuiNewPeeringOutbound from 'components/edit-forms/AuiNewPeeringOutbound'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import peeringOutboundContextMixin from 'src/mixins/data-context-pages/peering-details-outbound'
export default {
    name: 'AuiPeeringGroupDetailsOutboundRuleEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewPeeringOutbound
    },
    mixins: [
        peeringContextMixin,
        peeringOutboundContextMixin
    ],
    methods: {
        ...mapWaitingActions('peering', {
            updatePeeringOutboundrule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updatePeeringOutboundrule(data)
                showGlobalSuccessMessage(this.$t('Peering outbound rule successfully updated'))
            } finally {
                await this.reloadPeeringOutboundContext()
            }
        }
    }
}
</script>
