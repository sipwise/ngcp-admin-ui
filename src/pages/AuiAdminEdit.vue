<template>
    <aui-base-edit-context
        key="adminEdit"
        @form-input="triggerUpdate"
    >
        <aui-new-admin
            v-if="resourceObject"
            ref="form"
            :admin="resourceObject"
            :reseller="resourceRelatedObjects.reseller"
            :enable-password="false"
            :loading="$waitPage()"
        />
    </aui-base-edit-context>
</template>
<script>
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { mapActions, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'

export default {
    name: 'AuiAdminEdit',
    components: {
        AuiBaseEditContext,
        AuiNewAdmin
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ])
    },
    methods: {
        ...mapActions('administrators', [
            'updateAdministrator'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async triggerUpdate (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateAdministrator(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Administrator saved successfully'))
            } catch (err) {
                this.$refs.form.reset()
                throw err
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
