<template>
    <aui-base-edit-context>
        <aui-new-subscriber-trusted-sources
            v-if="subscriberContext && subscriberTrustedSourceContext"
            :initial-form-data="subscriberTrustedSourceContext"
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
        </aui-new-subscriber-trusted-sources>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriberTrustedSources from 'components/edit-forms/AuiNewSubscriberTrustedSources'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberTrustedSourceContextMixin from 'src/mixins/data-context-pages/subscriber-details-trusted-source'
export default {
    name: 'AuiSubscriberDetailsTrustedSourcesEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberTrustedSources
    },
    mixins: [
        subscriberContextMixin,
        subscriberTrustedSourceContextMixin
    ],
    async mounted () {
        await this.loadSubscriberTrustedSourceContext()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberTrustedSource: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberTrustedSource(data)
                showGlobalSuccessMessage(this.$t('Successfully updated trusted source'))
            } finally {
                await this.reloadSubscriberTrustedSourceContext()
            }
        }
    }
}
</script>
