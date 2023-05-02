<template>
    <aui-select-lazy
        icon="fas fa-clock"
        :label="$t('Time Set')"
        clearable
        store-getter="timeSets/filteredTimeSetOptions"
        store-action="timeSets/filterTimeSets"
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
    name: 'AuiSelectTimeSet',
    components: {
        AuiSelectLazy
    }
}
</script>
