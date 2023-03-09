<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-peering-inbound
                v-if="peeringContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage()"
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
            </aui-new-peering-inbound>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewPeeringInbound from 'components/edit-forms/AuiNewPeeringInbound'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
export default {
    name: 'AuiPeeringGroupDetailsInboundRuleCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewPeeringInbound
    },
    mixins: [
        peeringContextMixin
    ],
    methods: {
        ...mapWaitingActions('peering', {
            createinboundRule: WAIT_PAGE
        }),
        async create (data) {
            await this.createinboundRule(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Inbound peering rule successfully created'))
        }
    }
}
</script>
