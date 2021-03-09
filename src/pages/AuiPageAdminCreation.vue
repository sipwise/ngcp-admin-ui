<template>
    <aui-page-form-creation
        icon="fas fa-user-cog"
        :resource-singular="$t('Administrator')"
        :loading="$wait.is('aui-administrator-*')"
        :list-route="listRoute"
        @create="create"
    >
        <aui-new-admin
            ref="form"
            :enable-password="true"
            :loading="$wait.is('aui-administrator-*')"
        />
    </aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
export default {
    name: 'AuiPageDomainCreation',
    components: {
        AuiNewAdmin,
        AuiPageFormCreation
    },
    computed: {
        listRoute () {
            return '/administrator'
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
