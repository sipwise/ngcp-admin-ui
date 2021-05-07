<template>
    <aui-base-add-page
        @form-input="triggerCreation"
    >
        <aui-new-contact
            :has-reseller="hasReseller"
            :loading="$waitPage()"
        />
    </aui-base-add-page>
</template>
<script>
import AuiNewContact from 'components/edit-forms/AuiNewContact'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { mapActions } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiContactCreation',
    components: {
        AuiBaseAddPage,
        AuiNewContact
    },
    props: {
        hasReseller: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapActions('contact', [
            'createCustomerContact',
            'createSystemContact'
        ]),
        async triggerCreation (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                if (data.reseller_id) {
                    await this.createCustomerContact(data)
                } else {
                    await this.createSystemContact(data)
                }
                await this.$router.push({ name: 'contactList' })
                showGlobalSuccessMessage(this.$t('Contact created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
