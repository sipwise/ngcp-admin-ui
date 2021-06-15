<template>
    <span
        :class="$attrs.disable ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
        <template
            v-if="value === '' || value === undefined || value === null"
        >
            <q-btn
                icon="add"
                dense
                flat
                size="sm"
                :disable="$attrs.disable"
            />
        </template>
        {{ value }}
        <q-popup-edit
            v-if="!$attrs.disable"
            v-model="internalValue"
            buttons
            :label-set="$t('Save')"
            @before-show="popupBeforeShowEvent"
            @save="$emit('save', {
                column: column,
                row: row,
                value: internalValue
            })"
        >
            <aui-select-lazy
                v-model="internalValue"
                clearable
                dense
                :icon="column.componentIcon"
                :label="column.label"
                :store-getter="column.componentOptionsGetter"
                :store-action="column.componentOptionsAction"
                :disable="$attrs.disable"
            />
        </q-popup-edit>
    </span>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiDataTableEditSelectLazy',
    components: { AuiSelectLazy },
    props: {
        column: {
            type: Object,
            required: true
        },
        row: {
            type: Object,
            required: true
        },
        value: {
            type: [String, Number],
            default: undefined
        }
    },
    data () {
        return {
            internalValue: this.value
        }
    },
    methods: {
        popupBeforeShowEvent () {
            this.internalValue = this.value
        }
    }
}
</script>
