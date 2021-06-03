<template>
    <aui-base-add-page
        ref="addPage"
        @form-input="triggerCreation"
    >
        <aui-new-domain
            :loading="$waitPage()"
        />
    </aui-base-add-page>
</template>
<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewDomain from 'components/edit-forms/AuiNewDomain'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
export default {
    components: { AuiNewDomain, AuiBaseAddPage },
    methods: {
        ...mapActions('domain', [
            'createDomain'
        ]),
        async triggerCreation (data) {
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
