<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-peering-server
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
            </aui-new-peering-server>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewPeeringServer from 'components/edit-forms/AuiNewPeeringServer'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPeeringGroupDetailsServerCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewPeeringServer
    },
    mixins: [
        peeringContextMixin
    ],
    methods: {
        ...mapWaitingActions('peering', {
            createServer: WAIT_PAGE
        }),
        async create (data) {
            await this.createServer(data)
            showGlobalSuccessMessage(this.$t('Successfully created server'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
