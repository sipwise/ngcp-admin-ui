<template>
    <aui-select-lazy
        :label="$t('Timezone')"
        icon="fas fa-globe"
        store-getter="timezone/timezonesAsOptions"
        store-action="timezone/filterTimezones"
        dense
        clearable
        :load-initially="false"
        :error="false"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectionTimezone',
    components: {
        AuiSelectLazy
    }
}
</script>
