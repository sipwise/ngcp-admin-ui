<template>
    <div
        class="row items-baseline q-col-gutter-sm"
    >
        <div
            class="col"
        >
            <aui-select-lazy
                icon="fas fa-handshake"
                :label="$t('Contract')"
                clearable
                store-getter="contracts/filteredContractOptions"
                store-action="contracts/filterContracts"
                :load-initially="false"
                :create-buttons="createButtonsConfig"
                v-bind="$attrs"
                v-on="$listeners"
            />
        </div>
    </div>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectContract',
    components: {
        AuiSelectLazy
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
