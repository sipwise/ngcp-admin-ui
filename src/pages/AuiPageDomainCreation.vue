<template>
	<aui-page-form-creation
		icon="fas fa-network-wired"
		:resource-singular="$t('Domain')"
		:loading="$wait.is('processing createDomain')"
		:list-route="listRoute"
		@create="create"
	>
		<div
			class="row"
		>
			<aui-new-domain
				ref="form"
				class="col-xs-12 col-md-5 col-lg-5"
				@saved="saved"
			/>
		</div>
	</aui-page-form-creation>
</template>
<script>
import AuiNewDomain from 'components/edit-forms/AuiNewDomain'
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
export default {
	name: 'AuiPageDomainCreation',
	components: {
		AuiPageFormCreation,
		AuiNewDomain
	},
	computed: {
		listRoute () {
			return '/domain'
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
