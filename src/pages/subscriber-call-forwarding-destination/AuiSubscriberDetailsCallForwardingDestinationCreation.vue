<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-call-forwarding-destination
                v-if="subscriberContext"
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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewCallForwardingDestination from 'components/edit-forms/AuiNewCallForwardingDestination'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
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
