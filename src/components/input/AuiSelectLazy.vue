<template>
	<q-select
		ref="select"
		:value="$attrs.value"
		:options="filteredOptions"
		emit-value
		map-options
		use-input
		input-debounce="800"
		:loading="$wait.is(waitIdentifier)"
		v-bind="$attrs"
		v-on="$listeners"
		@filter="filter"
	>
		<template
			v-if="icon"
			v-slot:prepend
		>
			<q-icon
				:name="icon"
			/>
		</template>
	</q-select>
</template>

<script>
export default {
	name: 'AuiSelectLazy',
	props: {
		icon: {
			type: String,
			default: undefined
		},
		storeGetter: {
			type: String,
			required: true
		},
		storeAction: {
			type: String,
			required: true
		},
		loadInitially: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		filteredOptions () {
			return this.$store.getters[this.storeGetter]
		},
		waitIdentifier () {
			return this.$vnode.tag
		}
	},
	mounted () {
		if (this.loadInitially) {
			this.filter('')
		}
	},
	methods: {
		filter (filter, update, abort) {
			this.$wait.start(this.waitIdentifier)
			this.$store.dispatch(this.storeAction, filter).then(() => {
				if (update) {
					update()
				}
			}).catch(() => {
				if (abort) {
					abort()
				}
			}).finally(() => {
				this.$wait.end(this.waitIdentifier)
			})
		}
	}
}
</script>
