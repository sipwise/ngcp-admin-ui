<template>
    <aui-select-lazy
        :label="$t('Country')"
        store-getter="country/countriesAsOptions"
        store-action="country/filterCountries"
        dense
        autocomplete="off"
        :error="false"
        v-bind="$attrs"
    >
        <template
            v-for="(_, slotName) of $slots"
            #[slotName]="scope"
        >
            <slot
                :name="slotName"
                v-bind="scope"
            />
        </template>
    </aui-select-lazy>
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
