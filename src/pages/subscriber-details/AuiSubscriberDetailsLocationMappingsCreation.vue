<template>
    <aui-base-edit-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-location-mapping
                :initial-form-data="props.initialFormData"
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
            </aui-new-subscriber-location-mapping>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewSubscriberLocationMapping from 'components/edit-forms/AuiNewSubscriberLocationMapping'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsLocationMappingsCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewSubscriberLocationMapping
    },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            createSubscriberLocationMapping: WAIT_PAGE
        }),
        async create (data) {
            await this.createSubscriberLocationMapping(data)
            showGlobalSuccessMessage(this.$t('Successfully created location mapping'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
