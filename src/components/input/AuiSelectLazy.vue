<template>
	<q-select
		ref="select"
		:value="$attrs.value"
		:options="filteredOptions"
		emit-value
		map-options
		use-input
		input-debounce="500"
		:loading="$wait.is(waitIdentifier) || $attrs.loading"
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
		},
		filterCustomizationFunction: {
			type: Function,
			default: (filter) => filter
		}
	},
	computed: {
		filteredOptions () {
			let options = this.$store.getters[this.storeGetter]
			if (options === undefined || options === null) {
				options = []
			}
			if (options.length === 0) {
				options.push({
					label: this.$t('No data found'),
					disable: true
				})
			}
			return options
		},
		waitIdentifier () {
			return this.$vnode.tag + this.$vnode.componentInstance?._uid
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
			this.$store.dispatch(this.storeAction, this.filterCustomizationFunction(filter)).then(() => {
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
