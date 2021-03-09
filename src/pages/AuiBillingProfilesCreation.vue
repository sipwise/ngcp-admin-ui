<template>
    <aui-page-form-creation
        icon="fas fa-hand-holding-usd"
        :resource-singular="$t('Billing Profile')"
        :loading="$wait.is('processing createBillingProfile')"
        :list-route="listRoute"
        @create="create"
    >
        <aui-new-billing-profile
            ref="form"
            :loading="$wait.is('processing createBillingProfile')"
            @saved="saved"
        />
    </aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
export default {
    name: 'AuiPageResellerCreation',
    components: {
        AuiNewBillingProfile,
        AuiPageFormCreation
    },
    computed: {
        listRoute () {
            return '/billing'
        }
    },
    methods: {
        create () {
            this.$refs.form.submit()
        },
        saved () {
            this.$router.push({ path: this.listRoute })
        }
    }
}
</script>
