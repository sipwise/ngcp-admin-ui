<template>
    <aui-select-lazy
        :label="$t('Device Profiles')"
        icon="fas fa-fax"
        clearable
        dense
        store-generator-name="selectLazy/deviceProfilesList"
        :initial-option="initialOption"
        :store-action-params="{
            expand: 'device_id'
        }"
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
    name: 'AuiSelectDeviceProfiles',
    components: {
        AuiSelectLazy
    },
    props: {
        initialOption: {
            type: Object,
            default: null
        }
    }
}
</script>
