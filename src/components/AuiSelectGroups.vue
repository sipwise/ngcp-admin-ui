<template>
    <aui-select-lazy
        :label="$t('Groups')"
        icon="fas fa-users"
        clearable
        dense
        store-generator-name="selectLazy/groupsList"
        :store-action-params="{
            customer_id: customerId,
            is_pbx_group: 1,
            is_pbx_pilot: 0
        }"
        :multiple="true"
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
    name: 'AuiSelectGroups',
    components: {
        AuiSelectLazy
    },
    props: {
        customerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {}
    }
}
</script>
