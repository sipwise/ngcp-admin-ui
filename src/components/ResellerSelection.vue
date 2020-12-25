<template>
	<q-select
		clearable
		dense
		use-input
		hide-selected
		fill-input
		input-debounce="800"
		:label="$t('Reseller')"
		:value="value"
		:options="filteredResellerOptions"
		:disable="disable"
		:error="error"
		:error-message="errorMessage"
		@filter="filter"
		@input="inputEvent"
	>
		<template v-slot:prepend>
			<q-icon name="fas fa-user-tie" />
		</template>
	</q-select>
</template>

<script>
import {
	mapGetters,
	mapActions
} from 'vuex'
export default {
	name: 'ResellerSelection',
	props: {
		value: {
			type: Object,
			default: null
		},
		disable: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
			default: null
		}
	},
	computed: {
		...mapGetters('resellers', [
			'filteredResellerOptions'
		])
	},
	methods: {
		...mapActions('resellers', [
			'filterResellers'
		]),
		filter (filter, update, abort) {
			this.filterResellers(filter).then(() => {
				update()
			}).catch(() => {
				abort()
			})
		},
		inputEvent (input) {
			this.$emit('input', input)
		}
	}
}
</script>
