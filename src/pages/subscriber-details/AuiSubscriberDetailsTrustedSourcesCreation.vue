<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-subscriber-trusted-sources
                :initial-form-data="initialFormData"
                :subscriber-id="subscriberContext.id"
                :loading="$waitPage($wait)"
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
            </aui-new-subscriber-trusted-sources>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewSubscriberTrustedSources from 'components/edit-forms/AuiNewSubscriberTrustedSources'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsTrustedSourcesCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewSubscriberTrustedSources
    },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            createSubscriberTrustedSource: WAIT_PAGE
        }),
        async create (data) {
            await this.createSubscriberTrustedSource(data)
            showGlobalSuccessMessage(this.$t('Successfully created trusted source'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
