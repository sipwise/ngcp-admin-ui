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
			<reseller-selection
				v-model="currentReseller"
			/>
		</q-popup-edit>
	</div>
</template>
<script>
import ResellerSelection from '../ResellerSelection'
export default {
	name: 'ResellerPopupEdit',
	components: {
		ResellerSelection
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
