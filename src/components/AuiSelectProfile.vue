<template>
    <aui-select-lazy
        :label="$t('Profile')"
        icon="far fa-user"
        clearable
        dense
        store-generator-name="selectLazy/subscriberProfileList"
        :store-action-params="{
            reseller_id: resellerId,
            profile_set_id: profileSetId
        }"
        :load-initially="false"
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
    name: 'AuiSelectProfile',
    components: {
        AuiSelectLazy
    },
    props: {
        resellerId: {
            type: Number,
            default: null
        },
        profileSetId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {}
    }
}
</script>
