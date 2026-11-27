<template>
    <div
        :class="$aclCan('update', 'entity.' + resource) ? 'cursor-pointer' : 'cursor-not-allowed'"
    >
        {{ label }}
        <q-popup-edit
            v-if="$aclCan('update', 'entity.' + resource)"
            v-slot="scope"
            :model-value="value"
            buttons
            :label-set="$t('Save')"
            @save="save"
        >
            <aui-select-contract
                v-model="scope.value"
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
    emits: ['save', 'input'],
    methods: {
        save (value) {
            this.$emit('save', { value })
        },
        inputEvent (payload) {
            this.$emit('input', payload)
        }
    }
}
</script>
