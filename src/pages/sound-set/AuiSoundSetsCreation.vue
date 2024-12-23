<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-sound-sets
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
            </aui-new-sound-sets>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewSoundSets from 'components/edit-forms/AuiNewSoundSets'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSoundSetsCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewSoundSets,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('soundSets', {
            createSoundSets: WAIT_PAGE
        }),
        async create (data) {
            await this.createSoundSets(data)
            showGlobalSuccessMessage(this.$t('Sound Sets created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
