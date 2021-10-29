<template>
    <aui-base-add-page>
        <aui-new-reseller
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
        </aui-new-reseller>
    </aui-base-add-page>
</template>

<script>
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiResellerCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewReseller
    },
    methods: {
        ...mapActions('resellers', [
            'createReseller'
        ]),
        async create (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createReseller(data)
                this.$goBack()
                showGlobalSuccessMessage(this.$t('Reseller created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
