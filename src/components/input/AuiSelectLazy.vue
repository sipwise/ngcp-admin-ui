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
			v-slot:prepend
		>
			<slot
				name="prepend"
			/>
			<q-icon
				v-if="icon"
				:name="icon"
			/>
		</template>
		<template
			v-slot:append
		>
			<slot
				name="append"
			/>
		</template>
		<template
			v-slot:after
		>
			<slot
				name="after"
			/>
		</template>
	</q-select>
</template>

<script>
import _ from 'lodash'
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
		},
		initialOption: {
			type: Object,
			default: undefined
		}
	},
	computed: {
		filteredOptions () {
			let options = _.clone(this.$store.getters[this.storeGetter])
			if (options === undefined || options === null) {
				options = []
			}
			if (this.initialOption && options.length === 0) {
				options.push(this.initialOption)
			} else if (options.length === 0) {
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
