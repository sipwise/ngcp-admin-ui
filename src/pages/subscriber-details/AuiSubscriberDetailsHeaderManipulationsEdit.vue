<template>
    <aui-base-sub-context>
        <aui-new-subscriber-header-manipulations
            v-if="subscriberContext && subscriberHeaderRuleContext"
            :initial-form-data="subscriberHeaderRuleContext"
            :loading="$waitPage($wait)"
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
        </aui-new-subscriber-header-manipulations>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewSubscriberHeaderManipulations from 'src/components/edit-forms/AuiNewSubscriberHeaderManipulations'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
export default {
    name: 'AuiSubscriberDetailsManipulationsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberHeaderManipulations    
    },
    mixins: [
        subscriberContextMixin,
        subscriberHeaderRulesContextMixin
    ],
    async mounted () {
        await this.loadSubscriberHeaderRulesContext()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberHeaderRule: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberHeaderRule(data)
                showGlobalSuccessMessage(this.$t('Successfully updated header rule'))
            } finally {
                await this.reloadSubscriberHeaderRulesContext()
            }
        }
    }
}
</script>
