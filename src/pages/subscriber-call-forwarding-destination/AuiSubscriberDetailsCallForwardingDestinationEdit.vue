<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-destination
            v-if="subscriberContext && destinationSetContext"
            :initial-form-data="destinationSetContext"
            :loading="$waitPage($wait)"
            :subscriber-id="subscriberContext.id"
            :primary-number-object="subscriberContext.primary_number"
            :is-pbx-account="subscriberContextCustomerIsPbx"
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
import AuiNewCallForwardingDestination from 'components/edit-forms/AuiNewCallForwardingDestination'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import destinationSetContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-destination'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
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
