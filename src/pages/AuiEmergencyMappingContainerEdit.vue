<template>
    <aui-base-edit-context>
        <aui-new-emergency-mapping-container
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-emergency-mapping-container>
    </aui-base-edit-context>
</template>

<script>
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiNewEmergencyMappingContainer from 'components/edit-forms/AuiNewEmergencyMappingContainer'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { mapState } from 'vuex'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiEmergencyMappingContainerEdit',
    components: { AuiFormActionsUpdate, AuiNewEmergencyMappingContainer, AuiBaseEditContext },
    mixins: [dataContextPageMixin],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('emergencyContainers', {
            updateEmergencyMappingContainer: WAIT_PAGE
        }),
        async update (data) {
            await this.updateEmergencyMappingContainer({
                id: this.resourceObject.id,
                payload: data
            })
            await this.reloadDataContext('emergencyMappingContainerContext')
            showGlobalSuccessMessage(this.$t('Emergency Mappings saved successfully'))
        }
    }
}
</script>
