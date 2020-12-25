<template>
	<div
		class="cursor-pointer"
	>
		{{ label }}
		<q-popup-edit
			v-model="selectedValue"
			buttons
			:label-set="$t('Save')"
			@save="save"
		>
			<aui-selection-contract
				ref="resellerStatus"
				v-model="selectedValue"
				dense
			/>
		</q-popup-edit>
	</div>
</template>
<script>
import AuiSelectionContract from 'components/AuiSelectionContract'
export default {
	name: 'AuiPopupEditContract',
	components: {
		AuiSelectionContract
	},
	props: {
		label: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			default: null
		}
	},
	data () {
		return {
			selectedValue: this.value
		}
	},
	methods: {
		save () {
			this.$emit('save', {
				value: this.selectedValue
			})
		},
		inputEvent (payload) {
			this.$emit('input', payload)
		}
	}
}
</script>
