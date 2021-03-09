<template>
    <aui-page-form-creation
        icon="fas fa-user-tie"
        :resource-singular="$t('Customer')"
        :loading="$wait.is('processing createCustomer')"
        :list-route="listRoute"
        @create="create"
    >
        <aui-new-customer
            ref="form"
            :loading="$wait.is('processing createCustomer')"
            @saved="saved"
        />
    </aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
export default {
    name: 'AuiPageDomainCreation',
    components: {
        AuiNewCustomer,
        AuiPageFormCreation
    },
    computed: {
        listRoute () {
            return '/customer'
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
