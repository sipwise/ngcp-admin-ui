<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-destination
            v-if="subscriberContext && destinationSetContext"
            :initial-form-data="destinationSetContext"
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
        </aui-new-call-forwarding-destination>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewCallForwardingDestination from 'components/edit-forms/AuiNewCallForwardingDestination'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import destinationSetContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-destination'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsCallForwardingDestinationEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingDestination
    },
    mixins: [
        destinationSetContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            updateDestinationSet: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateDestinationSet(data)
                showGlobalSuccessMessage(this.$t('Destination set successfully updated'))
            } finally {
                await this.reloadDestinationSetContext()
            }
        }
    }
}
</script>
