<template>
    <aui-base-edit-context>
        <aui-new-subscriber-location-mapping
            v-if="subscriberContext && subscriberLocationMappingContext"
            :initial-form-data="subscriberLocationMappingContext"
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
        </aui-new-subscriber-location-mapping>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewSubscriberLocationMapping from 'components/edit-forms/AuiNewSubscriberLocationMapping'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberLocationMappingContextMixin from 'src/mixins/data-context-pages/subscriber-details-location-mapping'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsLocationMappingsEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberLocationMapping
    },
    mixins: [
        subscriberContextMixin,
        subscriberLocationMappingContextMixin
    ],
    async mounted () {
        await this.loadSubscriberLocationMappingContext()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberLocationMapping: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberLocationMapping(data)
                showGlobalSuccessMessage(this.$t('Successfully updated location mapping'))
            } finally {
                await this.reloadSubscriberLocationMappingContext()
            }
        }
    }
}
</script>
