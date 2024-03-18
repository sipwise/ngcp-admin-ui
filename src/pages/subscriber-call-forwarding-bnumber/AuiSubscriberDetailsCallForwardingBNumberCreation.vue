<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-call-forwarding-b-number
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :subscriber-id="subscriberContext.id"
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
            </aui-new-call-forwarding-b-number>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewCallForwardingBNumber from 'components/edit-forms/AuiNewCallForwardingBNumber'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallForwardingBNumberCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewCallForwardingBNumber,
        AuiBaseSubContext
    },
    mixins: [subscriberContextMixin],
    methods: {
        ...mapWaitingActions('subscribers', {
            createBNumberSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createBNumberSet(data)
            showGlobalSuccessMessage(this.$t('Destination Set created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
