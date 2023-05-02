<template>
    <aui-base-edit-context>
        <aui-new-peering-server
            v-if="peeringContext && peeringServerContext"
            :initial-form-data="peeringServerContext"
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
        </aui-new-peering-server>
    </aui-base-edit-context>
</template>

<script>
import AuiNewPeeringServer from 'components/edit-forms/AuiNewPeeringServer'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import peeringServerContextMixin from 'src/mixins/data-context-pages/peering-details-server'
export default {
    name: 'AuiPeeringGroupDetailsServerEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewPeeringServer
    },
    mixins: [
        peeringContextMixin,
        peeringServerContextMixin
    ],
    methods: {
        ...mapWaitingActions('peering', {
            updatePeeringServer: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updatePeeringServer(data)
                showGlobalSuccessMessage(this.$t('Server successfully updated'))
            } finally {
                await this.reloadPeeringServerContext()
            }
        }
    }
}
</script>
