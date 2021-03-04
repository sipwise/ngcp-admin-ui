<template>
	<aui-page-form-creation
		icon="fas fa-address-card"
		:resource-singular="$t('Contact')"
		:loading="$wait.is('processing createContact')"
		:list-route="listRoute"
		@create="create"
	>
		<aui-new-contact
			ref="form"
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
	computed: {
		listRoute () {
			return '/contact'
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
