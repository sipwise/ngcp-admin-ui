<template>
    <aui-select-lazy
        v-model="numbers"
        :label="$t('Numbers')"
        icon="fas fa-phone-alt"
        clearable
        dense
        store-generator-name="selectLazy/numbersList"
        :store-action-params="{
            customer_id: customerId,
            type: type
        }"
        :load-initially="false"
        :multiple="true"
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
    name: 'AuiSelectNumbers',
    components: {
        AuiSelectLazy
    },
    props: {
        customerId: {
            type: Number,
            default: null
        },
        type: {
            type: String,
            default: 'alias'
        }
    },
    data () {
        return {
            numbers: []
        }
    }
}
</script>
