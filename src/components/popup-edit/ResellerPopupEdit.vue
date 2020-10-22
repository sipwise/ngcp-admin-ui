<template>
	<div
		class="cursor-pointer"
	>
		{{ administrator.reseller_name }}
		<q-popup-edit
			v-model="currentReseller"
			buttons
			:label-set="$t('actions.save')"
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
		administrator: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			currentReseller: {
				label: this.administrator.reseller_name,
				value: null
			}
		}
	},
	methods: {
		save () {
			this.$emit('save', {
				id: this.administrator.id,
				field: 'reseller_id',
				value: this.currentReseller.value
			})
		},
		inputEvent (payload) {
			this.$emit('input', payload)
		}
	}
}
</script>
