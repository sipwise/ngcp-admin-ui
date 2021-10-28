<template>
    <aui-select-lazy
        icon="fas fa-handshake"
        :label="$t('Contract')"
        clearable
        store-getter="contracts/filteredContractOptions"
        store-action="contracts/filterContracts"
        :store-action-params="{
            isReseller: isReseller
        }"
        :load-initially="false"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-for="(_, slotName) of $scopedSlots"
            v-slot:[slotName]="scope"
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
    name: 'AuiSelectContract',
    components: {
        AuiSelectLazy
    },
    props: {
        isReseller: {
            type: Boolean,
            default: false
        }
    }
}
</script>
