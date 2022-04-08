<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-domain
                :initial-form-data="props.initialFormData"
                :loading="$waitPage()"
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
            </aui-new-domain>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewDomain from 'components/edit-forms/AuiNewDomain'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDomainCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewDomain,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('domain', {
            createDomain: WAIT_PAGE
        }),
        async create (data) {
            await this.createDomain(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Domain created successfully'))
        }
    }
}
</script>
