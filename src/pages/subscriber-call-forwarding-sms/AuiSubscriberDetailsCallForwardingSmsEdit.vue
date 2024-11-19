<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-sms
            v-if="subscriberContext"
            :initial-form-data="smsContext && smsContext.cfs"
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
                    :close="false"
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
import { mapActions } from 'vuex'
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
            updateMapping: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateMapping({
                    ...this.smsContext,
                    cfs: data.cfs
                })
                showGlobalSuccessMessage(this.$t('cfs successfully updated'))
            } finally {
                await this.reloadSmsContext()
            }
        }
    }
}
</script>
