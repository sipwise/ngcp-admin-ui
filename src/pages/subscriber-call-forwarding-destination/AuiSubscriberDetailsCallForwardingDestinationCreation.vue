<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-call-forwarding-destination
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :subscriber-id="subscriberContext.id"
                :primary-number-object="subscriberContext.primary_number"
                @submit="create"
            >
                <template
                    #actions="{ loading, hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-call-forwarding-destination>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewCallForwardingDestination from 'components/edit-forms/AuiNewCallForwardingDestination'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallForwardingDestinationCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewCallForwardingDestination,
        AuiBaseSubContext
    },
    mixins: [subscriberContextMixin],
    methods: {
        ...mapWaitingActions('subscribers', {
            createDestinationSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createDestinationSet(data)
            showGlobalSuccessMessage(this.$t('Destination Set created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
