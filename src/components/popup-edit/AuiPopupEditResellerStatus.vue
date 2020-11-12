<template>
	<div
		class="cursor-pointer"
	>
		{{ status }}
		<q-popup-edit
			v-model="resellerStatus"
			buttons
			:label-set="$t('actions.save')"
			@save="save"
		>
			<aui-selection-reseller-status
				ref="resellerStatus"
				v-model="resellerStatus"
				dense
			/>
		</q-popup-edit>
	</div>
</template>
<script>
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
export default {
	name: 'AuiPopupEditResellerStatus',
	components: {
		AuiSelectionResellerStatus
	},
	props: {
		status: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			resellerStatus: this.status
		}
	},
	methods: {
		save () {
			this.$emit('save', {
				value: this.resellerStatus
			})
		},
		inputEvent (payload) {
			this.$emit('input', payload)
		}
	}
}
</script>
