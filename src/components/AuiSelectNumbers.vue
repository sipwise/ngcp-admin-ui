<template>
    <aui-select-lazy
        :model-value="$attrs.value"
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
        :emit-value="true"
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
    }
}
</script>
