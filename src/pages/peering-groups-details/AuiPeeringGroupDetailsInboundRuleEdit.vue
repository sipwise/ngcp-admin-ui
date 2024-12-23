<template>
    <aui-base-edit-context>
        <aui-new-peering-inbound
            v-if="peeringContext && peeringInboundContext"
            :initial-form-data="peeringInboundContext"
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
        </aui-new-peering-inbound>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewPeeringInbound from 'components/edit-forms/AuiNewPeeringInbound'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import peeringInboundContextMixin from 'src/mixins/data-context-pages/peering-details-inbound'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPeeringGroupDetailsOutboundRuleEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewPeeringInbound
    },
    mixins: [
        peeringContextMixin,
        peeringInboundContextMixin
    ],
    methods: {
        ...mapWaitingActions('peering', {
            updatePeeringInboundrule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updatePeeringInboundrule(data)
                showGlobalSuccessMessage(this.$t('Peering inbound rule successfully updated'))
            } finally {
                await this.reloadPeeringInboundContext()
            }
        }
    }
}
</script>
