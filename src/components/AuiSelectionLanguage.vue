<template>
	<q-btn
		icon="language"
		:color="iconColor"
		round
		small
		flat
	>
		<q-menu>
			<q-expansion-item
				v-model="expanded"
				:label="languageLabel"
				label-lines="1"
			>
				<q-item
					v-for="(language, index) in options"
					:key="index"
					v-close-popup
					clickable
					@click="setLanguage(language.value)"
				>
					{{ $t(language.label) }}
				</q-item>
			</q-expansion-item>
		</q-menu>
	</q-btn>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import { i18n } from 'boot/i18n'
export default {
	name: 'AuiSelectionLanguage',
	props: {
		iconColor: {
			type: String,
			default: 'primary'
		}
	},
	data () {
		return {
			expanded: false
		}
	},
	computed: {
		languageLabel () {
			const lang = _.first(this.options.filter(item => item.value === i18n.locale))
			return this.$t('Language') + ' (' + lang.label + ')'
		},
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
	methods: {
		...mapActions('user', [
			'setLanguage'
		])
	}
}
</script>
