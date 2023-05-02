<template>
    <aui-select-lazy
        icon="fas fa-handshake"
        :label="$t('Contract')"
        clearable
        store-getter="contracts/filteredContractOptions"
        store-action="contracts/filterContracts"
        :store-action-params="{
            isReseller: isReseller,
            isSippeering: isSippeering
        }"
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
    name: 'AuiSelectContract',
    components: {
        AuiSelectLazy
    },
    props: {
        isReseller: {
            type: Boolean,
            default: false
        },
        isSippeering: {
            type: Boolean,
            default: false
        }
    }
}
</script>
