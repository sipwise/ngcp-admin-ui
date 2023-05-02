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
            v-slot="scope"
            v-model="internalValue"
            buttons
            :label-set="$t('Save')"
            @before-show="popupBeforeShowEvent"
            @save="$emit('save', {
                column: column,
                row: row,
                value: internalValue
            })"
            @cancel="internalValue = value"
        >
            <aui-select-lazy
                v-model="scope.value"
                clearable
                dense
                :icon="column.componentIcon"
                :label="column.label"
                data-cy="aui-data-table-edit-select-lazy--popup"
                :store-getter="column.componentOptionsGetter"
                :store-action="column.componentOptionsAction"
                :disable="$attrs.disable"
                @update:modelValue="internalValue = scope.value"
                @keyup.enter="scope.set"
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
    emits: ['save'],
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
