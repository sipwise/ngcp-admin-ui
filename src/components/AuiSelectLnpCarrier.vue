<template>
    <aui-select-lazy
        :value="$attrs.value"
        :label="$t('LNP Carrier')"
        icon="fa-solid fa-circle-nodes"
        clearable
        dense
        store-generator-name="selectLazy/lnpCarriersList"
        :load-initially="true"
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
    name: 'AuiSelectLnpCarrier',
    components: {
        AuiSelectLazy
    }
}
</script>
