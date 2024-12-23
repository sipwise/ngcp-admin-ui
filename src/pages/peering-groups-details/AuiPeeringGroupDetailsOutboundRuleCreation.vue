<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-peering-outbound
                v-if="peeringContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :group-id="peeringContext.id"
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
            </aui-new-peering-outbound>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewPeeringOutbound from 'components/edit-forms/AuiNewPeeringOutbound'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPeeringGroupDetailsOutboundRuleCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewPeeringOutbound
    },
    mixins: [
        peeringContextMixin
    ],
    methods: {
        ...mapWaitingActions('peering', {
            createOutboundRule: WAIT_PAGE
        }),
        async create (data) {
            await this.createOutboundRule(data)
            showGlobalSuccessMessage(this.$t('Outbound peering rule successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
