<template>
	<aui-select-lazy
		v-model="country"
		:label="$t('Country')"
		store-getter="country/countriesAsOptions"
		store-action="country/filterCountries"
		dense
		:load-initially="false"
		:error="false"
		@input="$emit('countrySelected', country)"
	/>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
	name: 'AuiSelectionCountry',
	components: {
		AuiSelectLazy
	},
	data () {
		return {
			country: null
		}
	}
}
</script>
