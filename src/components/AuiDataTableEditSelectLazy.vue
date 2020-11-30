<template>
	<span
		class="cursor-pointer"
	>
		<template
			v-if="value === '' || value === undefined || value === null"
		>
			<q-btn
				icon="add"
				dense
				flat
				size="sm"
			/>
		</template>
		{{ value }}
		<q-popup-edit
			v-model="internalValue"
			buttons
			:label-set="$t('Save')"
			@before-show="popupBeforeShowEvent"
			@save="$emit('save', {
				column: column,
				row: row,
				value: internalValue
			})"
		>
			<q-select
				v-model="internalValue"
				clearable
				dense
				use-input
				hide-selected
				fill-input
				emit-value
				map-options
				input-debounce="800"
				:options="options"
				:label="column.label"
				@filter="filter"
			>
				<template
					v-if="column.componentIcon"
					v-slot:prepend
				>
					<q-icon
						:name="column.componentIcon"
					/>
				</template>
			</q-select>
		</q-popup-edit>
	</span>
</template>

<script>
export default {
	name: 'AuiDataTableEditSelectLazy',
	props: {
		column: {
			type: Object,
			required: true
		},
		row: {
			type: Object,
			required: true
		},
		value: {
			type: [String, Number],
			default: undefined
		}
	},
	data () {
		return {
			internalValue: this.value
		}
	},
	computed: {
		options () {
			return this.$store.getters[this.column.componentOptionsGetter]
		}
	},
	methods: {
		popupBeforeShowEvent () {
			this.internalValue = this.value
		},
		filter (filter, update, abort) {
			this.$store.dispatch(this.column.componentOptionsAction, filter).then(() => {
				update()
			}).catch(() => {
				abort()
			})
		}
	}
}
</script>
