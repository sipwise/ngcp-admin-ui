<template>
    <aui-base-add-page
        @save="$refs.form.submit()"
    >
        <aui-new-reseller
            ref="form"
            :loading="loading"
            @input="triggerCreation"
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
    name: 'AuiPageResellerCreation',
    components: {
        AuiBaseAddPage,
        AuiNewReseller
    },
    computed: {
        loading () {
            return this.$wait.is(WAIT_PAGE)
        }
    },
    methods: {
        ...mapActions('resellers', [
            'createReseller'
        ]),
        async triggerCreation (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createReseller(data)
                await this.$router.push({ name: 'resellerList' })
                showGlobalSuccessMessage(this.$t('Reseller created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
