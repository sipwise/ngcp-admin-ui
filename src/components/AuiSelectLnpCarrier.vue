<template>
    <aui-select-lazy
        :value="$attrs.value"
        :label="$t('LNP Carrier')"
        icon="fas fa-sim-card"
        clearable
        dense
        store-generator-name="selectLazy/lnpCarrierList"
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
