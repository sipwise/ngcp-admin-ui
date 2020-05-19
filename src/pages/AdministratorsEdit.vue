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
				:loading="isAdminLoading"
				@click="$refs.adminEditForm.submit()"
			/>
			<q-btn
				class="q-mr-sm"
				icon="delete"
				:label="$t('actions.delete')"
				unelevated
				color="negative"
				:disable="isAdminLoading"
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
				:loading="isAdminLoading"
				:error="hasAdminFailed"
				:error-message="adminError"
				:reseller-options="filteredResellerOptions"
				@filter-resellers="filterResellersEvent"
				@input-equal="inputEqual"
				@submit="updateAdministrator"
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
		...mapGetters('user', [
			// 'isEntityUpdateRequesting',
			// 'hasEntityUpdateFailed',
			// 'entityUpdateError',
			// 'isEntityLoadRequesting',
			// 'hasEntityLoadFailed',
			// 'entityLoadError',
			// 'entityLoaded'
		]),
		...mapGetters('administrators', [
			'isAdminLoading',
			'hasAdminFailed',
			'filteredResellerOptions'
		]),
		...mapState('administrators', [
			'admin',
			'relatedReseller',
			'adminError'
		])
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
		filterResellersEvent (options) {
			if (this.filteredResellerOptions.length > 0 && options.filter === this.resellerFilter) {
				options.update()
			} else {
				this.filterResellers(options.filter).then(() => {
					options.update()
				}).catch(() => {
					options.abort()
				})
			}
		},
		inputEqual (value) {
			this.isInputEqual = value
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
