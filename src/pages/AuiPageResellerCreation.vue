<template>
	<aui-page-form-creation
		icon="fas fa-users"
		:resource-singular="$t('Reseller')"
		:loading="$wait.is('processing createReseller')"
		:list-route="listRoute"
		@create="create"
	>
		<div
			class="row"
		>
			<aui-new-reseller
				ref="form"
				class="col-xs-12 col-md-5 col-lg-5"
				@saved="saved"
			/>
		</div>
	</aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
export default {
	name: 'AuiPageResellerCreation',
	components: {
		AuiNewReseller,
		AuiPageFormCreation
	},
	computed: {
		listRoute () {
			return '/reseller'
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
