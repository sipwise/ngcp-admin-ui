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
        :create-buttons="createButtonsConfig"
        v-bind="$attrs"
        v-on="$listeners"
    />
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
    },
    computed: {
        createButtonsConfig () {
            return [{
                to: { name: 'contractCreatePeering' }
            }, {
                to: { name: 'contractCreateReseller' }
            }]
        }
    }
}
</script>
