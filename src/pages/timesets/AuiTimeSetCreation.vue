<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-time-set-form
                :initial-form-data="initialFormData"
                :loading="loading"
                @submit="create"
            >
                <template
                    #actions="{ hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-time-set-form>
        </template>
    </aui-base-add-page>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiTimeSetForm from 'components/edit-forms/AuiTimeSetForm'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiTimeSetCreation',
    components: {
        AuiTimeSetForm,
        AuiFormActionsCreation,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('timeSets', {
            createTimeSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createTimeSet(data)
            showGlobalSuccessMessage(this.$t('Timeset entry successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
