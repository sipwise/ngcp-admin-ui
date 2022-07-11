<template>
    <aui-base-edit-context>
        <aui-new-subscriber-upn-rewrite
            v-if="subscriberContext && subscriberUpnRewriteContext"
            :initial-form-data="subscriberUpnRewriteContext"
            :loading="$waitPage()"
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
        </aui-new-subscriber-upn-rewrite>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriberUpnRewrite from 'components/edit-forms/AuiNewSubscriberUpnRewrite'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberUpnRewriteContextMixin from 'src/mixins/data-context-pages/subscriber-details-upn-rewrite'
export default {
    name: 'AuiSubscriberDetailsUpnRewriteEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberUpnRewrite
    },
    mixins: [
        subscriberContextMixin,
        subscriberUpnRewriteContextMixin
    ],
    async mounted () {
        await this.loadSubscriberUpnRewriteContext()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberUpnRewrite: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberUpnRewrite(data)
                showGlobalSuccessMessage(this.$t('Successfully updated UPN rewrite set'))
            } finally {
                await this.reloadSubscriberUpnRewriteContext()
            }
        }
    }
}
</script>
