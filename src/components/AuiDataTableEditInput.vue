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
			<q-input
				v-model="internalValue"
				dense
				autofocus
				:label="column.label"
			>
				<template
					v-if="column.componentIcon"
					v-slot:prepend
				>
					<q-icon
						:name="column.componentIcon"
					/>
				</template>
			</q-input>
		</q-popup-edit>
	</span>
</template>

<script>
export default {
	name: 'AuiDataTableEditInput',
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
	methods: {
		popupBeforeShowEvent () {
			this.internalValue = this.value
		}
	}
}
</script>
