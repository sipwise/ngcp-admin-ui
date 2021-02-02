<template>
	<aui-select-lazy
		v-model="id"
		:label="$t('Billing Profile')"
		store-getter="billing/billingProfilesAsOptions"
		store-action="billing/fetchBillingProfiles"
		dense
		:error="$v.id.$error"
		:error-message="$errMsg($v.id)"
		:load-initially="false"
		@input="$emit('billingProfileSelected', {value: id, index: index})"
	/>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import { required } from 'vuelidate/lib/validators'
export default {
	name: 'AuiSelectReseller',
	components: {
		AuiSelectLazy
	},
	props: {
		index: {
			type: Number,
			default: undefined
		}
	},
	data () {
		return {
			id: null
		}
	},
	validations: {
		id: {
			required
		}
	},
	methods: {
		touch () {
			this.$v.$touch()
		}
	}
}
</script>
