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
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-call-forwarding-timeout>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingTimeout from 'components/edit-forms/AuiNewCallForwardingTimeout'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import timeoutContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-timeout'
import {
    mapActions
} from 'vuex'
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
            loadDestinationSet: WAIT_PAGE,
            loadMapping: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            updateCfT: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateCfT(data)
                showGlobalSuccessMessage(this.$t('cft successfully updated'))
                this.isSubmitted = true
            } finally {
                await this.loadDestinationSet(this.subscriberContextResourceId)
                await this.loadTimeSet(this.subscriberContextResourceId)
                await this.loadSourceSet(this.subscriberContextResourceId)
                await this.loadBNumberSet(this.subscriberContextResourceId)
                await this.reloadTimeoutContext()
            }
        }
    }
}
</script>
