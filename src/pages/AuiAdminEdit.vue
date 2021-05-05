<template>
    <aui-base-edit-context
        :has-unsaved-data="hasUnsavedData"
        @save="triggerSave"
        @reset="triggerReset"
    >
        <aui-new-admin
            v-if="resourceObject"
            ref="form"
            :admin="resourceObject"
            :reseller="resourceRelatedObjects.reseller"
            :enable-password="false"
            :loading="loading"
            @has-unsaved-data="hasUnsavedData=$event"
            @input="submit"
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
    name: 'AuiPageAdminUpdate',
    components: {
        AuiBaseEditContext,
        AuiNewAdmin
    },
    data () {
        return {
            hasUnsavedData: false
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        loading () {
            return this.$wait.is(WAIT_PAGE)
        }
    },
    methods: {
        ...mapActions('administrators', [
            'updateAdministrator'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async submit (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateAdministrator(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Administrator saved successfully'))
            } catch (err) {
                this.triggerReset()
                throw err
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        },
        triggerSave () {
            this.$refs.form.submit()
        },
        triggerReset () {
            this.$refs.form.reset()
        }
    }
}
</script>
