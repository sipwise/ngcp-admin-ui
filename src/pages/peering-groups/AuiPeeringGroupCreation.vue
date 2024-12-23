<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-peering
                :initial-form-data="props.initialFormData"
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
            </aui-new-peering>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewPeering from 'components/edit-forms/AuiNewPeering'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPeeringCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewPeering,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('peering', {
            createPeering: WAIT_PAGE
        }),
        async create (data) {
            await this.createPeering(data)
            showGlobalSuccessMessage(this.$t('Peering group created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
