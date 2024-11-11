<template>
    <aui-select-lazy
        :label="$t('Device Configurations')"
        icon="fas fa-fax"
        clearable
        dense
        store-generator-name="selectLazy/deviceConfigurationsList"
        :store-action-params="{
            expand: 'device_id'
        }"
        :load-initially="true"
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
    name: 'AuiSelectDeviceConfigurations',
    components: {
        AuiSelectLazy
    }
}
</script>
