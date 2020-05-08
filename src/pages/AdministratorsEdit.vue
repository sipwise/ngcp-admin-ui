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
				:disable="isEntityLoadRequesting || isEntityUpdateRequesting"
				:loading="isEntityLoadRequesting || isEntityUpdateRequesting"
				@click="$refs.adminCreateForm.submit()"
			/>
			<q-btn
				class="q-mr-sm"
				icon="save"
				icon-right="arrow_back"
				unelevated
				label="Save and back"
				color="primary"
				:disable="isEntityLoadRequesting || isEntityUpdateRequesting"
				:loading="isEntityLoadRequesting || isEntityUpdateRequesting"
				@click="$refs.adminCreateForm.submit()"
			/>
			<q-btn
				class="q-mr-sm"
				icon="delete"
				:label="$t('actions.delete')"
				unelevated
				color="negative"
			/>
		</div>
		<div
			class="row"
		>
			<administrator-form
				ref="editForm"
				:form-data="entityLoaded"
				:enable-password="false"
				:loading="isEntityUpdateRequesting || isEntityLoadRequesting"
				:error="hasEntityUpdateFailed || hasEntityLoadFailed"
				:error-message="entityUpdateError"
				:reseller-options="filteredResellerOptions"
				@filter-resellers="filterResellersEvent"
			/>
		</div>
	</q-page>
</template>

<script>
import {
	mapActions,
	mapGetters
} from 'vuex'
import AdministratorForm from '../components/AdministratorForm'
export default {
	name: 'AdministratorsEdit',
	components: {
		AdministratorForm
	},
	data () {
		return {
			resellerFilter: ''
		}
	},
	computed: {
		...mapGetters('user', [
			'isEntityUpdateRequesting',
			'hasEntityUpdateFailed',
			'entityUpdateError',
			'isEntityLoadRequesting',
			'hasEntityLoadFailed',
			'entityLoadError',
			'entityLoaded'
		]),
		...mapGetters('administrators', [
			'filteredResellerOptions'
		])
	},
	mounted () {
		this.loadAdministrator(this.$route.params.id)
	},
	methods: {
		...mapActions('administrators', [
			'filterResellers',
			'loadAdministrator'
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
