<template>
    <aui-base-add-page
        ref="addPage"
        @form-input="triggerCreation"
    >
        <aui-new-reseller
            :loading="$waitPage()"
        />
    </aui-base-add-page>
</template>

<script>
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
export default {
    name: 'AuiResellerCreation',
    components: {
        AuiBaseAddPage,
        AuiNewReseller
    },
    methods: {
        ...mapActions('resellers', [
            'createReseller'
        ]),
        async triggerCreation (data) {
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
