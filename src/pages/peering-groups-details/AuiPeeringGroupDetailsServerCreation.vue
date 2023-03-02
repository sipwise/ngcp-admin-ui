<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-peering-server
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
            </aui-new-peering-server>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewPeeringServer from 'components/edit-forms/AuiNewPeeringServer'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
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
    computed: {
        getDefaultData () {
            return {
                name: null,
                ip: null,
                host: null,
                port: null,
                transport: null,
                weight: null,
                via_route: null,
                probe: null,
                enabled: null
            }
        }
    },
    methods: {
        ...mapWaitingActions('peering', {
            createServer: WAIT_PAGE
        }),
        async create (data) {
            await this.createServer(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Successfully created server'))
        }
    }
}
</script>
