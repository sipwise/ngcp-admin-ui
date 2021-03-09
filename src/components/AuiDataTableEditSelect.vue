<template>
    <span
        class="cursor-pointer"
    >
        <template
            v-if="value === '' || value === undefined || value === null"
        >
            <q-btn
                icon="add"
                dense
                flat
                size="sm"
            />
        </template>
        {{ label }}
        <q-popup-edit
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
            <q-select
                v-model="internalValue"
                :options="column.componentOptions"
                :label="column.label"
                emit-value
                map-options
                dense
                autofocus
            >
                <template
                    v-if="column.componentIcon"
                    v-slot:prepend
                >
                    <q-icon
                        :name="column.componentIcon"
                    />
                </template>
            </q-select>
        </q-popup-edit>
    </span>
</template>

<script>
export default {
    name: 'AuiDataTableEditSelect',
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
    computed: {
        label () {
            const refOption = this.column.componentOptions.find(option => option.value === this.value)
            if (refOption) {
                return refOption.label
            } else {
                return this.value
            }
        }
    },
    methods: {
        popupBeforeShowEvent () {
            this.internalValue = this.value
        }
    }
}
</script>
