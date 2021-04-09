<template>
    <aui-page-form-creation
        icon="fas fa-address-card"
        :resource-singular="$t('Contact')"
        :loading="$wait.is('processing createContact')"
        :list-route="listRoute"
        @create="create"
        @close="closed"
    >
        <aui-new-contact
            ref="form"
            :noreseller="noreseller"
            @saved="saved"
        />
    </aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
import AuiNewContact from 'components/edit-forms/AuiNewContact'
export default {
    name: 'AuiPageContactCreation',
    components: {
        AuiPageFormCreation,
        AuiNewContact
    },
    props: {
        noreseller: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        listRoute () {
            return '/contact'
        }
    },
    methods: {
        create () {
            this.$refs.form.submit()
        },
        closed () {
            if (this.noreseller) {
                // here we need to think about a common solution to override redirect to previous page
                // in history instead of table view if needed
                this.$router.back()
            }
        },
        saved () {
            if (this.noreseller) {
                this.$router.back()
            } else {
                this.$router.push({ path: this.listRoute })
            }
        }
    }
}
</script>
