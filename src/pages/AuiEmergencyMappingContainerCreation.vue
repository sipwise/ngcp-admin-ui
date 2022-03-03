<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-emergency-mapping-container
                :initial-form-data="props.initialFormData"
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
            </aui-new-emergency-mapping-container>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewEmergencyMappingContainer from 'components/edit-forms/AuiNewEmergencyMappingContainer'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiEmergencyMappingContainerCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewEmergencyMappingContainer,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('emergencyContainers', {
            createEmergencyMappingContainer: WAIT_PAGE
        }),
        async create (payload) {
            await this.createEmergencyMappingContainer(payload)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Emergency Mapping Container created successfully'))
        }
    }
}
</script>
