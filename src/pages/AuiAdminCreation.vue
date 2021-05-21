<template>
    <aui-base-add-page
        ref="addPage"
        @form-input="triggerCreation"
    >
        <aui-new-admin
            :enable-password="true"
            :loading="$waitPage()"
        />
    </aui-base-add-page>
</template>
<script>
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { mapActions } from 'vuex'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiPageDomainCreation',
    components: {
        AuiBaseAddPage,
        AuiNewAdmin
    },
    methods: {
        ...mapActions('administrators', [
            'createAdministrator'
        ]),
        async triggerCreation (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createAdministrator(data)
                this.$refs.addPage.goBack()
                showGlobalSuccessMessage(this.$t('Administrator created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
