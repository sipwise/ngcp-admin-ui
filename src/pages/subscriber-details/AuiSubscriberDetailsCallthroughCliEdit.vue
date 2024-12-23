<template>
    <aui-base-edit-context>
        <aui-new-subscriber-call-through-cli
            v-if="subscriberContext && subscriberCallthroughCliContext"
            :initial-form-data="subscriberCallthroughCliContext"
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
        </aui-new-subscriber-call-through-cli>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewSubscriberCallThroughCli from 'components/edit-forms/AuiNewSubscriberCallThroughCli'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberCallthroughCliContextMixin from 'src/mixins/data-context-pages/subscriber-details-callthrough-cli'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsCallthroughCLIsEdit',
    components: {
        AuiNewSubscriberCallThroughCli,
        AuiFormActionsUpdate,
        AuiBaseEditContext
    },
    mixins: [
        subscriberContextMixin,
        subscriberCallthroughCliContextMixin
    ],
    async mounted () {
        await this.loadSubscriberCallthroughCliContext()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberCCmappings: WAIT_PAGE
        }),
        async update (data) {
            try {
                data.subscriber_id = this.$route.params.id
                await this.updateSubscriberCCmappings(data)
                showGlobalSuccessMessage(this.$t('Successfully updated ccmappings'))
            } finally {
                await this.reloadSubscriberCallthroughCliContext()
            }
        }
    }
}
</script>
