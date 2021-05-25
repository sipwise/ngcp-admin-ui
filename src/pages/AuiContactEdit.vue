<template>
    <aui-base-edit-context
        @form-input="triggerUpdate"
    >
        <aui-new-contact
            v-if="resourceObject"
            ref="form"
            :contact="resourceObject"
            :reseller="reseller"
            :has-reseller="!!reseller"
            :loading="$waitPage()"
        />
    </aui-base-edit-context>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import {
    WAIT_PAGE
} from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiNewContact from 'components/edit-forms/AuiNewContact'
export default {
    name: 'AuiContactEdit',
    components: {
        AuiBaseEditContext,
        AuiNewContact
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        reseller () {
            return this.resourceRelatedObjects?.reseller
        }
    },
    methods: {
        ...mapActions('contact', [
            'updateCustomerContact',
            'updateSystemContact'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async triggerUpdate (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                if (this.reseller) {
                    await this.updateCustomerContact(data)
                } else {
                    await this.updateSystemContact(data)
                }
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contract saved successfully'))
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
