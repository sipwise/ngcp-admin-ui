<template>
	<q-page
		class="q-pa-lg"
	>
		<div
			class="q-mb-xl"
		>
			<q-btn
				class="q-mr-sm"
				icon="clear"
				outline
				label="Cancel"
				color="primary"
				to="/administrator"
			/>
			<q-btn
				class="q-mr-sm"
				icon="fas fa-user-cog"
				unelevated
				label="Create administrator"
				color="primary"
				:disable="isEntityCreationRequesting"
				:loading="isEntityCreationRequesting"
				@click="submitCreateForm"
			/>
		</div>
		<div
			class="row"
		>
			<administrator-form
				ref="createForm"
				:enable-password="true"
				:loading="isEntityCreationRequesting"
				:error="hasEntityCreationFailed"
				:error-message="entityCreationError"
				@submit="createAdministrator"
			/>
		</div>
	</q-page>
</template>

<script>
import {
	mapActions,
	mapGetters,
	mapMutations
} from 'vuex'
import AdministratorForm from '../components/AdministratorForm'
export default {
	name: 'AdministratorsCreate',
	components: {
		AdministratorForm
	},
	data () {
		return {}
	},
	computed: {
		...mapGetters('user', [
			'isEntityCreationRequesting',
			'hasEntityCreationFailed',
			'entityCreationError'
		])
	},
	mounted () {
		this.entityCreationInitialized()
	},
	methods: {
		...mapActions('administrators', [
			'createAdministrator'
		]),
		...mapMutations('user', [
			'entityCreationInitialized'
		]),
		submitCreateForm () {
			this.$refs.createForm.submit()
		}
	}
}

</script>

<style lang="sass" rel="stylesheet/sass">
.q-psm.Password
	width: 100%
	max-width: none
	.Password__strength-meter
		margin-top: 8px
		margin-bottom: 8px
</style>
