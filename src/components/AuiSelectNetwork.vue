<template>
    <aui-select-lazy
        v-model="network"
        :label="$t('Network')"
        :initial-option="initialOption"
        store-generator-name="selectLazy/billingNetworksList"
        dense
        :load-initially="false"
        :error="false"
        @input="$emit('billingNetworkSelected', {value: network, index: index})"
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
    name: 'AuiSelectNetwork',
    components: {
        AuiSelectLazy
    },
    props: {
        index: {
            type: Number,
            default: undefined
        },
        initialOption: {
            type: Object,
            default: null
        },
        initialValue: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            network: null
        }
    },
    mounted () {
        if (this.initialValue) {
            this.network = this.initialValue
        }
    }
}
</script>
