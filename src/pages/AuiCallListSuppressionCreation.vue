<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-call-list-suppression
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
            </aui-new-call-list-suppression>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewCallListSuppression from 'components/edit-forms/AuiNewCallListSuppression'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCallListSuppressionCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewCallListSuppression,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('callListSuppressions', {
            createCallListSuppression: WAIT_PAGE
        }),
        async create (payload) {
            await this.createCallListSuppression(payload)
            showGlobalSuccessMessage(this.$t('Call list suppression successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
