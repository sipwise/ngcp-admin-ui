<template>
    <aui-select-lazy
        :label="$t('Zones')"
        icon="fas fa-funnel-dollar"
        clearable
        dense
        store-generator-name="selectLazy/zonesList"
        :store-action-params="{
            billing_profile_id: billingProfileId,
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
    name: 'AuiSelectZone',
    components: {
        AuiSelectLazy
    },
    props: {
        billingProfileId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {}
    }
}
</script>
