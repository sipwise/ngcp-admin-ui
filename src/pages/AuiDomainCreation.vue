<template>
    <aui-base-add-page>
        <aui-new-domain
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
    </aui-base-add-page>
</template>
<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewDomain from 'components/edit-forms/AuiNewDomain'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    components: { AuiFormActionsCreation, AuiNewDomain, AuiBaseAddPage },
    methods: {
        ...mapActions('domain', [
            'createDomain'
        ]),
        async create (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createDomain(data)
                this.$goBack()
                showGlobalSuccessMessage(this.$t('Domain created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
