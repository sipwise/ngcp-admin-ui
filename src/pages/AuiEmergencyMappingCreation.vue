<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-emergency-mapping
                v-if="resourceObject"
                :initial-form-data="initialFormData"
                :loading="$waitPage()"
                :emergency-container-id="resourceObject.id"
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
            </aui-new-emergency-mapping>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewEmergencyMapping from 'components/edit-forms/AuiNewEmergencyMapping'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'

export default {
    name: 'AuiEmergencyMappingCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewEmergencyMapping
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('emergencyMappings', {
            createEmergencyMapping: WAIT_PAGE
        }),
        async create (data) {
            await this.createEmergencyMapping(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Successfully created emergency mappings'))
        }
    }
}
</script>
