<template>
	<q-select
		v-model="language"
		emit-value
		map-options
		class="col"
		:options="options"
		v-bind="$attrs"
		v-on="$listeners"
		:label="$t('Language')"
		:label-color="color"
	>
		<template v-slot:prepend>
			<q-icon
				name="language"
				:color="color"
			/>
		</template>
	</q-select>
</template>

<script>
export default {
	name: 'AuiSelectionLanguage',
	props: {
		value: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: 'primary'
		}
	},
	data () {
		return {
			language: null
		}
	},
	computed: {
		options () {
			return [
				{
					value: 'en-us',
					label: this.$t('English')
				},
				{
					value: 'de',
					label: this.$t('German')
				},
				{
					value: 'es',
					label: this.$t('Spanish')
				},
				{
					value: 'fr',
					label: this.$t('French')
				},
				{
					value: 'it',
					label: this.$t('Italian')
				},
				{
					value: 'ru',
					label: this.$t('Russian')
				}
			]
		}
	},
	mounted () {
		this.language = this.value
	}
}
</script>
