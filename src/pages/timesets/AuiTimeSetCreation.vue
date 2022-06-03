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
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiTimeSetForm from 'components/edit-forms/AuiTimeSetForm'
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
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Timeset entry successfully created'))
        }
    }
}
</script>
