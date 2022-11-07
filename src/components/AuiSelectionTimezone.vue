<template>
    <aui-select-lazy
        :label="$t('Timezone')"
        icon="fas fa-globe"
        store-getter="timezone/timezonesAsOptions"
        store-action="timezone/filterTimezones"
        dense
        :clearable="clearable"
        :load-initially="false"
        :error="false"
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
    name: 'AuiSelectionTimezone',
    components: {
        AuiSelectLazy
    },
    props: {
        clearable: {
            type: Boolean,
            default: true
        }
    }
}
</script>
