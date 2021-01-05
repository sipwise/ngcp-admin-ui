<template>
	<div
		class="cursor-pointer"
	>
		{{ resellerName }}
		<q-popup-edit
			v-model="currentReseller"
			buttons
			:label-set="$t('Save')"
			@save="save"
		>
			<aui-select-reseller
				v-model="currentReseller"
				dense
			/>
		</q-popup-edit>
	</div>
</template>
<script>
import AuiSelectReseller from '../AuiSelectReseller'
export default {
	name: 'AuiPopupEditReseller',
	components: {
		AuiSelectReseller
	},
	props: {
		resellerName: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			currentReseller: {
				label: this.resellerName,
				value: null
			}
		}
	},
	methods: {
		save () {
			this.$emit('save', {
				value: this.currentReseller.value
			})
		},
		inputEvent (payload) {
			this.$emit('input', payload)
		}
	}
}
</script>
