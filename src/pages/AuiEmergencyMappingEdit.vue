<template>
    <aui-base-edit-context>
        <aui-new-emergency-mapping
            v-if="resourceObject && mappings"
            :initial-form-data="mappings"
            :loading="$waitPage()"
            :emergency-container-id="resourceObject.id"
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
        </aui-new-emergency-mapping>
    </aui-base-edit-context>
</template>

<script>
import AuiNewEmergencyMapping from 'components/edit-forms/AuiNewEmergencyMapping'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    name: 'AuiEmergencyMappingEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewEmergencyMapping
    },
    mixins: [dataContextPageMixin],
    props: {
        mappingId: {
            type: [String, Number],
            required: true
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        mappings () {
            return this.getDataContextObject('emergencyMappingContext')
        }
        
    },
    methods: {
        ...mapWaitingActions('emergencyMappings', {
            updateEmergencyMapping: WAIT_PAGE
        }),
        async update (data) {
            await this.updateEmergencyMapping({
                id: this.mappingId,
                payload: data
            })
            await this.reloadDataContext('emergencyMappingContext')
            showGlobalSuccessMessage(this.$t('Emergency Mappings saved successfully'))
        }
    }
}
</script>
