<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-busy
            v-if="subscriberContext"
            :initial-form-data="busyContext"
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
import AuiNewCallForwardingBusy from 'components/edit-forms/AuiNewCallForwardingBusy'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import busyContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-busy'
import {
    mapActions
} from 'vuex'
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
            loadDestinationSet: WAIT_PAGE,
            loadMapping: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            updateCfB: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateCfB(data)
                showGlobalSuccessMessage(this.$t('cfb successfully updated'))
                this.isSubmitted = true
            } finally {
                await this.loadDestinationSet(this.subscriberContextResourceId)
                await this.loadTimeSet(this.subscriberContextResourceId)
                await this.loadSourceSet(this.subscriberContextResourceId)
                await this.loadBNumberSet(this.subscriberContextResourceId)
                await this.reloadBusyContext()
            }
        }
    }
}
</script>
