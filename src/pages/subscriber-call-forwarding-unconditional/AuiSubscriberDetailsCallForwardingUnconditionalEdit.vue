<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-unconditional
            v-if="subscriberContext"
            :initial-form-data="unconditionalContext && unconditionalContext.cfu"
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
        </aui-new-call-forwarding-unconditional>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingUnconditional from 'components/edit-forms/AuiNewCallForwardingUnconditional'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import unconditionalContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-unconditional'
import { mapActions } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsCallForwardingUnconditionalEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingUnconditional
    },
    mixins: [
        subscriberContextMixin,
        unconditionalContextMixin
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
                    ...this.unconditionalContext,
                    cfu: data.cfu
                })
                showGlobalSuccessMessage(this.$t('cfu successfully updated'))
            } finally {
                await this.reloadUnconditionalContext()
            }
        }
    }
}
</script>
