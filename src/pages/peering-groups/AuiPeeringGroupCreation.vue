<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-peering
                :initial-form-data="props.initialFormData"
                :loading="$waitPage()"
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
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewPeering from 'components/edit-forms/AuiNewPeering'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
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
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Peering group created successfully'))
        }
    }
}
</script>
