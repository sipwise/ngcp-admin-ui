<template>
    <aui-select-lazy
        :label="label"
        icon="fas fa-users"
        clearable
        dense
        store-generator-name="selectLazy/groupsList"
        :store-action-params="storeActionParams"
        :multiple="multiple"
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
    name: 'AuiSelectGroups',
    components: {
        AuiSelectLazy
    },
    props: {
        customerId: {
            type: Number,
            default: null
        },
        pbxGroup: {
            type: Boolean,
            default: false
        },
        pbxPilot: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            required: true
        }
    },
    computed: {
        storeActionParams () {
            const params = {
                customer_id: this.customerId
            }
            if (this.pbxGroup) {
                params.is_pbx_group = 1
            }
            if (this.pbxPilot) {
                params.is_pbx_pilot = 0
            }
            return params
        }
    }
}
</script>
