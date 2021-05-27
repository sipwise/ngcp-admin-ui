<template>
    <aui-select-lazy
        :label="$t('Timezone')"
        store-getter="timezone/timezonesAsOptions"
        store-action="timezone/filterTimezones"
        dense
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
