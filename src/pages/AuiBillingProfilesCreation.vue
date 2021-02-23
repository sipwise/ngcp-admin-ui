<template>
	<aui-page-form-creation
		icon="fas fa-hand-holding-usd"
		:resource-singular="$t('Billing Profile')"
		:loading="$wait.is('processing createBillingProfile')"
		:list-route="listRoute"
		@create="create"
	>
		<div
			class="row"
		/>
	</aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
export default {
	name: 'AuiPageResellerCreation',
	components: {
		AuiPageFormCreation
	},
	computed: {
		listRoute () {
			return '/billing'
		}
	},
	methods: {
		create () {
			// TODO
		},
		saved () {
			this.$router.push({ path: this.listRoute })
		}
	}
}
</script>
