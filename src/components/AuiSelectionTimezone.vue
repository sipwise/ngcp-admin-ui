<template>
    <aui-select-lazy
        v-model="timezone"
        :label="$t('Timezone')"
        store-getter="timezone/timezonesAsOptions"
        store-action="timezone/filterTimezones"
        dense
        :load-initially="false"
        :error="false"
        @input="$emit('timezoneSelected', timezone)"
    />
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectionTimezone',
    components: {
        AuiSelectLazy
    },
    data () {
        return {
            timezone: null
        }
    }
}
</script>
