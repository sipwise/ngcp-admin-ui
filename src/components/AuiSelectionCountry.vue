<template>
    <aui-select-lazy
        :label="$t('Country')"
        store-getter="country/countriesAsOptions"
        store-action="country/filterCountries"
        dense
        autocomplete="off"
        :error="false"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectionCountry',
    components: {
        AuiSelectLazy
    }
}
</script>
