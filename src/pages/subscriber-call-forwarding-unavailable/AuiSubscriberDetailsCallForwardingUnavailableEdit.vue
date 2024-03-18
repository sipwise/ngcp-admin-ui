<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-unavailable
            v-if="subscriberContext"
            :initial-form-data="unavailableContext"
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
        </aui-new-call-forwarding-unavailable>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCallForwardingUnavailable from 'components/edit-forms/AuiNewCallForwardingUnavailable'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import unavailableContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-unavailable'
import {
    mapActions
} from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingUnavailableEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingUnavailable
    },
    mixins: [
        subscriberContextMixin,
        unavailableContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            loadDestinationSet: WAIT_PAGE,
            loadMapping: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            updateCfNA: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateCfNA(data)
                showGlobalSuccessMessage(this.$t('cfna successfully updated'))
                this.isSubmitted = true
            } finally {
                await this.loadDestinationSet(this.subscriberContextResourceId)
                await this.loadTimeSet(this.subscriberContextResourceId)
                await this.loadSourceSet(this.subscriberContextResourceId)
                await this.loadBNumberSet(this.subscriberContextResourceId)
                await this.reloadUnavailableContext()
            }
        }
    }
}
</script>
