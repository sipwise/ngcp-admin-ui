<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-header-rule
                v-if="subscriberContext"
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
            </aui-new-header-rule>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiNewHeaderRule from 'src/components/edit-forms/AuiNewHeaderRule'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsHeaderRuleCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewHeaderRule
    },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createSubscriberHeaderRule: WAIT_PAGE
        }),
        async create (data) {
            await this.createSubscriberHeaderRule(data)
            showGlobalSuccessMessage(this.$t('Header rule created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
