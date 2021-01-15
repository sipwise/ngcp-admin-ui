<template>
	<q-form>
		<q-list
			dense
		>
			<q-item>

			</q-item>
		</q-list>
	</q-form>
</template>

<script>
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
	name: 'AuiNewCustomer',
	components: {
	},
	props: {
		loading: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {

		}
	},
	validations: {

	},
	methods: {
		async submit () {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				try {
					const submitData = {
					}

					// await this.createCustomer(submitData)
					this.$emit('saved', submitData)

					showGlobalSuccessMessage(this.$t('New customer created successfully'))
				} catch (err) {
					showGlobalErrorMessage(err)
				}
			}
		}
	}
}
</script>
