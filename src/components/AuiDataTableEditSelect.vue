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
        <aui-data-table-highlighted-text
            :highlighted="highlighted"
            :highlighted-text="label"
            :search-term="searchTerm"
        />
        <q-popup-edit
            v-if="!$attrs.disable"
            v-slot="scope"
            v-model="internalValue"
            buttons
            :label-set="$t('Save')"
            @before-show="popupBeforeShowEvent"
            @cancel="internalValue = value"
            @save="$emit('save', {
                column: column,
                row: row,
                value: internalValue
            })"
        >
            <q-select
                v-model="scope.value"
                :options="column.componentOptions"
                :label="column.label"
                data-cy="aui-data-table-edit-select--popup"
                emit-value
                map-options
                dense
                autofocus
                :disable="$attrs.disable"
                @update:model-value="internalValue = scope.value"
                @keyup.enter="scope.set"
            >
                <template
                    v-if="column.componentIcon"
                    #prepend
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
import AuiDataTableHighlightedText from 'components/data-table/AuiDataTableHighlightedText'
export default {
    name: 'AuiDataTableEditSelect',
    components: { AuiDataTableHighlightedText },
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
        },
        highlighted: {
            type: Boolean,
            default: false
        },
        searchTerm: {
            type: String,
            default: undefined
        }
    },
    emits: ['save'],
    data () {
        return {
            internalValue: this.value
        }
    },
    computed: {
        label () {
            if (this.column.displayValue === true) {
                return this.value
            }
            const refOption = this.column.componentOptions.find((option) => option.value === this.value)
            if (refOption) {
                return refOption.label
            }
            return this.value
        }
    },
    methods: {
        popupBeforeShowEvent () {
            this.internalValue = this.value
        }
    }
}
</script>
