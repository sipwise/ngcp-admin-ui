<template>
    <aui-select-lazy
        icon="fas fa-handshake"
        :label="$t('Contract')"
        clearable
        store-getter="contracts/filteredAllContracts"
        store-action="contracts/loadAllContracts"
        :load-initially="false"
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
    name: 'AuiSelectAllContract',
    components: {
        AuiSelectLazy
    }
}
</script>
