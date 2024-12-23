<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-timeout
            v-if="subscriberContext"
            :initial-form-data="timeoutContext"
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
                    :close-button="false"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-call-forwarding-timeout>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewCallForwardingTimeout from 'components/edit-forms/AuiNewCallForwardingTimeout'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import timeoutContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-timeout'
import { mapWaitingActions } from 'vue-wait'
import { mapActions } from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingTimeOutEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingTimeout
    },
    mixins: [
        subscriberContextMixin,
        timeoutContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            updateMapping: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateMapping({
                    ...this.timeoutContext,
                    cft: data.cft,
                    cft_ringtimeout: data.cft_ringtimeout
                })
                showGlobalSuccessMessage(this.$t('cft successfully updated'))
            } finally {
                await this.reloadTimeoutContext()
            }
        }
    }
}
</script>
