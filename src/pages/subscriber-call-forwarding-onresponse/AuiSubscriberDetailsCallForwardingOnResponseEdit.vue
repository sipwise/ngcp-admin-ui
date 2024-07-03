<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-response
            v-if="subscriberContext"
            :initial-form-data="responseContext"
            :loading="$waitPage($wait)"
            :subscriber-id="subscriberContext.id"
            :primary-number-object="subscriberContext.primary_number"
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
        </aui-new-call-forwarding-response>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingResponse from 'components/edit-forms/AuiNewCallForwardingResponse'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import responseContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-response'
import {
    mapActions
} from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingOnResponseEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingResponse
    },
    mixins: [
        subscriberContextMixin,
        responseContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            loadDestinationSet: WAIT_PAGE,
            loadMapping: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            updateCfR: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateCfR(data)
                showGlobalSuccessMessage(this.$t('cfr successfully updated'))
                this.isSubmitted = true
            } finally {
                await this.loadDestinationSet(this.subscriberContextResourceId)
                await this.loadTimeSet(this.subscriberContextResourceId)
                await this.loadSourceSet(this.subscriberContextResourceId)
                await this.loadBNumberSet(this.subscriberContextResourceId)
                await this.reloadResponseContext()
            }
        }
    }
}
</script>
