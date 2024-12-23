<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-busy
            v-if="subscriberContext"
            :initial-form-data="busyContext && busyContext.cfb"
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
        </aui-new-call-forwarding-busy>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewCallForwardingBusy from 'components/edit-forms/AuiNewCallForwardingBusy'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import busyContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-busy'
import { mapWaitingActions } from 'vue-wait'
import { mapActions } from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingBusyEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingBusy
    },
    mixins: [
        subscriberContextMixin,
        busyContextMixin
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
                    ...this.busyContext,
                    cfb: data.cfb
                })
                showGlobalSuccessMessage(this.$t('cfb successfully updated'))
            } finally {
                await this.reloadBusyContext()
            }
        }
    }
}
</script>
