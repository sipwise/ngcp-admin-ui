<template>
    <aui-select-lazy
        :label="$t('Profile Set')"
        icon="far fa-user"
        clearable
        dense
        store-generator-name="selectLazy/subscriberProfileSetList"
        :store-action-params="{
            reseller_id: resellerId
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
    name: 'AuiSelectProfileSet',
    components: {
        AuiSelectLazy
    },
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {}
    }
}
</script>
