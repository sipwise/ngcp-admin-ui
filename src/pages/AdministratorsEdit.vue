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
				icon="save"
				unelevated
				label="Save"
				color="primary"
				:disable="isAdminLoading || isInputEqual"
				:loading="false"
				@click="$refs.adminEditForm.submit()"
			/>
			<q-btn
				class="q-mr-sm"
				icon="undo"
				unelevated
				label="Reset"
				color="primary"
				:disable="isAdminLoading || isInputEqual"
				@click="$refs.adminEditForm.reset()"
			/>
		</div>
		<div
			class="row"
		>
			<administrator-form
				ref="adminEditForm"
				:admin="admin"
				:related-reseller="relatedReseller"
				:enable-password="false"
				:loading="isAdminLoading || isAdminUpdating"
				:error="hasAdminFailed || hasAdminUpdateFailed"
				:error-message="adminError || adminUpdateError"
				@input-equal="inputEqual"
				@submit="editAdministrator"
			/>
		</div>
	</q-page>
</template>

<script>
import {
	mapActions,
	mapGetters,
	mapState
} from 'vuex'
import AdministratorForm from '../components/AdministratorForm'
export default {
	name: 'AdministratorsEdit',
	components: {
		AdministratorForm
	},
	data () {
		return {
			resellerFilter: '',
			isInputEqual: true
		}
	},
	computed: {
		...mapGetters('administrators', [
			'isAdminLoading',
			'hasAdminFailed',
			'filteredResellerOptions',
			'isAdminUpdating',
			'hasAdminUpdateSucceeded',
			'hasAdminUpdateFailed'
		]),
		...mapState('administrators', [
			'admin',
			'relatedReseller',
			'adminError',
			'adminUpdateError'
		])
	},
	watch: {
		hasAdminUpdateSucceeded (value) {
			if (value === true) {
				this.$q.notify({
					position: 'top',
					color: 'positive',
					icon: 'check',
					message: this.$t('notify.administratorUpdatedSuccessfully')
				})
			}
		}
	},
	mounted () {
		this.loadAdministrator(this.$route.params.id)
	},
	methods: {
		...mapActions('administrators', [
			'filterResellers',
			'loadAdministrator',
			'updateAdministrator'
		]),
		inputEqual (value) {
			this.isInputEqual = value
		},
		editAdministrator (data) {
			this.updateAdministrator({
				id: this.admin.id,
				data: data
			})
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
