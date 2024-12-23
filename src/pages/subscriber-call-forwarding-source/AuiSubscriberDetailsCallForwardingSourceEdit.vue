<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-source
            v-if="subscriberContext && sourceSetContext"
            :initial-form-data="sourceSetContext"
            :loading="$waitPage($wait)"
            :subscriber-id="subscriberContext.id"
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
        </aui-new-call-forwarding-source>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewCallForwardingSource from 'components/edit-forms/AuiNewCallForwardingSource'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import sourceSetContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-sourceset'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuisubscriberDetailsCallForwardingSourceEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingSource
    },
    mixins: [
        sourceSetContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSourceSet: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSourceSet(data)
                showGlobalSuccessMessage(this.$t('Source set successfully updated'))
            } finally {
                await this.reloadSourceSetContext()
            }
        }
    }
}
</script>
