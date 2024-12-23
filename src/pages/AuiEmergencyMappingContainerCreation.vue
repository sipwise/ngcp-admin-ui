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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewEmergencyMappingContainer from 'components/edit-forms/AuiNewEmergencyMappingContainer'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
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
            showGlobalSuccessMessage(this.$t('Emergency Mapping Container created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
