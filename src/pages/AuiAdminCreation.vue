<template>
    <aui-base-add-page
        @save="$refs.form.submit()"
    >
        <aui-new-admin
            ref="form"
            :enable-password="true"
            :loading="loading"
            @input="triggerCreation"
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
    computed: {
        loading () {
            return this.$wait.is(WAIT_PAGE)
        }
    },
    methods: {
        ...mapActions('administrators', [
            'createAdministrator'
        ]),
        async triggerCreation (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createAdministrator(data)
                await this.$router.push({ name: 'adminList' })
                showGlobalSuccessMessage(this.$t('Administrator created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
