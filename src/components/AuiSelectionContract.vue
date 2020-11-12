<template>
	<q-select
		:value="value"
		:options="filteredContractOptions"
		:label="$t('Reseller Contract')"
		use-input
		emit-value
		input-debounce="800"
		:loading="$wait.is($options.name)"
		v-bind="$attrs"
		v-on="$listeners"
		@filter="filter"
	>
		<template
			v-slot:prepend
		>
			<q-icon
				name="fas fa-handshake"
			/>
		</template>
	</q-select>
</template>

<script>
import {
	mapGetters,
	mapActions
} from 'vuex'
export default {
	name: 'AuiSelectionContract',
	props: {
		value: {
			type: Number,
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
			this.$wait.start(this.$options.name)
			this.filterContracts(filter).then(() => {
				update()
			}).catch(() => {
				abort()
			}).finally(() => {
				this.$wait.end(this.$options.name)
			})
		}
	}
}
</script>
