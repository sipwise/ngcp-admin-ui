<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-ncos-level
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
            </aui-new-ncos-level>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewNcosLevel from 'components/edit-forms/AuiNewNCOSLevel'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiNCOSSetsCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewNcosLevel,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('ncosLevels', {
            createNCOSLevel: WAIT_PAGE
        }),
        async create (data) {
            await this.createNCOSLevel(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('NCOS Level created successfully'))
        }
    }
}
</script>
