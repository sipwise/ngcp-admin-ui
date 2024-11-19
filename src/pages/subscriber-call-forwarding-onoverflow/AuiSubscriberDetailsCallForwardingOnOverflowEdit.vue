<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-overflow
            v-if="subscriberContext"
            :initial-form-data="overflowContext && overflowContext.cfo"
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
        </aui-new-call-forwarding-overflow>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingOverflow from 'components/edit-forms/AuiNewCallForwardingOverflow'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import overflowContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-overflow'
import { mapActions } from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingOnOverflowEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingOverflow
    },
    mixins: [
        subscriberContextMixin,
        overflowContextMixin
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
                    ...this.overflowContext,
                    cfo: data.cfo
                })
                showGlobalSuccessMessage(this.$t('cfo successfully updated'))
            } finally {
                await this.reloadOverflowContext()
            }
        }
    }
}
</script>
