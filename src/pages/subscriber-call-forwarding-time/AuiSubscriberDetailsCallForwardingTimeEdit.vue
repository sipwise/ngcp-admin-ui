<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-time
            v-if="subscriberContext && timeSetContext"
            :initial-form-data="timeSetContext"
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
        </aui-new-call-forwarding-time>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingTime from 'components/edit-forms/AuiNewCallForwardingTime'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import timeSetContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-time'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallForwardingTimeEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingTime
    },
    mixins: [
        timeSetContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            updateTimeSet: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateTimeSet(data)
                showGlobalSuccessMessage(this.$t('Time Set successfully updated'))
            } finally {
                await this.reloadTimeSetContext()
            }
        }
    }
}
</script>
