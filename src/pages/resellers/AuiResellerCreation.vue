<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-reseller
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
            </aui-new-reseller>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiResellerCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewReseller
    },
    methods: {
        ...mapWaitingActions('resellers', {
            createReseller: WAIT_PAGE
        }),
        async create (data) {
            await this.createReseller(data)
            showGlobalSuccessMessage(this.$t('Reseller created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
