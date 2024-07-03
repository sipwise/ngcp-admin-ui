<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-unconditional
            v-if="subscriberContext"
            :initial-form-data="unconditionalContext"
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
import {
    mapActions
} from 'vuex'
export default {
    name: 'AuisubscriberDetailsCallForwardingUnconditionalEdit',
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
            loadDestinationSet: WAIT_PAGE,
            loadMapping: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            updateCfU: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                await this.updateCfU(data)
                showGlobalSuccessMessage(this.$t('cfu successfully updated'))
            } finally {
                await this.loadDestinationSet(this.subscriberContextResourceId)
                await this.loadTimeSet(this.subscriberContextResourceId)
                await this.loadSourceSet(this.subscriberContextResourceId)
                await this.loadBNumberSet(this.subscriberContextResourceId)
                await this.reloadUncondtionalContext()
            }
        }
    }
}
</script>
