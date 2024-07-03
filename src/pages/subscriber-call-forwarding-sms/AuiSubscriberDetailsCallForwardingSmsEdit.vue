<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-sms
            v-if="subscriberContext"
            :initial-form-data="smsContext"
            :loading="$waitPage($wait)"
            :subscriber-id="subscriberContext.id"
            :primary-number-object="subscriberContext.primary-number"
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
        </aui-new-call-forwarding-sms>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingSms from 'components/edit-forms/AuiNewCallForwardingSms'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import smsContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-sms'
import {
    mapActions
} from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingSmsEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingSms
    },
    mixins: [
        subscriberContextMixin,
        smsContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            loadDestinationSet: WAIT_PAGE,
            loadMapping: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            updateCfS: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateCfS(data)
                showGlobalSuccessMessage(this.$t('cfs successfully updated'))
                this.isSubmitted = true
            } finally {
                await this.loadDestinationSet(this.subscriberContextResourceId)
                await this.loadTimeSet(this.subscriberContextResourceId)
                await this.loadSourceSet(this.subscriberContextResourceId)
                await this.loadBNumberSet(this.subscriberContextResourceId)
                await this.reloadSmsContext()
            }
        }
    }
}
</script>
