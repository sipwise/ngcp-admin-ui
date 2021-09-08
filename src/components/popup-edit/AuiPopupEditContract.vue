<template>
    <div
        :class="$aclCan('update', 'entity.' + resource) ? 'cursor-pointer' : 'cursor-not-allowed'"
    >
        {{ label }}
        <q-popup-edit
            v-if="$aclCan('update', 'entity.' + resource)"
            v-model="selectedValue"
            buttons
            :label-set="$t('Save')"
            @save="save"
        >
            <aui-select-contract
                v-model="selectedValue"
                dense
                :is-reseller="isReseller"
            />
        </q-popup-edit>
    </div>
</template>
<script>
import AuiSelectContract from 'components/AuiSelectContract'
export default {
    name: 'AuiPopupEditContract',
    components: {
        AuiSelectContract
    },
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            default: null
        },
        isReseller: {
            type: Boolean,
            default: false
        },
        resource: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            selectedValue: this.value
        }
    },
    methods: {
        save () {
            this.$emit('save', {
                value: this.selectedValue
            })
        },
        inputEvent (payload) {
            this.$emit('input', payload)
        }
    }
}
</script>
