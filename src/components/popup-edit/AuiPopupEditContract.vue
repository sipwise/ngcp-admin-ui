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
			<aui-select-contract
				v-model="selectedValue"
				dense
			/>
		</q-popup-edit>
	</div>
</template>
<script>
import AuiSelectContract from 'components/AuiSelectContract'
export default {
	name: 'AuiPopupEditContract',
	components: {
		AuiSelectContract
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
