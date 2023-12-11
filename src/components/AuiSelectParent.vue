<template>
    <aui-select-lazy
        :label="$t('Parent')"
        clearable
        store-generator-name="selectLazy/soundSetsList"
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
    name: 'AuiSelectCustomer',
    components: {
        AuiSelectLazy
    }
}
</script>
