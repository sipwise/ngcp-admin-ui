<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-call-forwarding-source
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
            </aui-new-call-forwarding-source>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewCallForwardingSource from 'components/edit-forms/AuiNewCallForwardingSource'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsCallForwardingSourceCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewCallForwardingSource,
        AuiBaseSubContext
    },
    mixins: [subscriberContextMixin],
    methods: {
        ...mapWaitingActions('subscribers', {
            createSourceSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createSourceSet(data)
            showGlobalSuccessMessage(this.$t('Source Set created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
