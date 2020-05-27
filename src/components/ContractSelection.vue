<template>
	<q-select
		clearable
		dense
		use-input
		hide-selected
		fill-input
		input-debounce="800"
		:label="$t('resellers.tcContract')"
		:value="value"
		:options="filteredContractOptions"
		:disable="disable"
		:error="error"
		:error-message="errorMessage"
		@filter="filter"
		@input="inputEvent"
	>
		<template v-slot:prepend>
			<q-icon name="fas fa-handshake" />
		</template>
	</q-select>
</template>

<script>
import {
	mapGetters,
	mapActions
} from 'vuex'
export default {
	name: 'ContractSelection',
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
		...mapGetters('contracts', [
			'filteredContractOptions'
		])
	},
	methods: {
		...mapActions('contracts', [
			'filterContracts'
		]),
		filter (filter, update, abort) {
			this.filterContracts(filter).then(() => {
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
