<template>
    <div
        class="row q-col-gutter-x-md aui-data-table-filter"
        data-cy="aui-data-table-filter"
        style="min-width: 300px"
    >
        <div
            class="col-grow"
        >
            <q-select
                data-cy="aui-data-table-filter-criteria"
                :value="filterCriteria"
                :options="filterCriteriaOptions"
                dense
                emit-value
                map-options
                :label="$t('Search by')"
                borderless
                :disable="loading || disabled"
                @input="$emit('update:filter-criteria', $event)"
            />
        </div>
        <div
            class="col-auto"
        >
            <aui-input-search
                ref="toolbarSearchInput"
                :key="'toolbarSearchInput' + Math.random()"
                data-cy="aui-input-search--datatable"
                :value="filter"
                :disable="loading || disabled"
                dense
                borderless
                autofocus
                @input="emitFilterEvent($event)"
            />
        </div>
    </div>
</template>

<script>
import AuiInputSearch from 'components/input/AuiInputSearch'
import _ from 'lodash'
export default {
    name: 'AuiDataTableFilter',
    components: { AuiInputSearch },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        filterCriteria: {
            type: String,
            default: undefined
        },
        filterCriteriaOptions: {
            type: Array,
            default: undefined
        },
        filter: {
            type: String,
            default: undefined
        }
    },
    methods: {
        focus () {
            if (this.$refs.toolbarSearchInput) {
                this.$refs.toolbarSearchInput.focus()
            }
            this.$nextTick(() => {
                if (this.$refs.toolbarSearchInput) {
                    this.$refs.toolbarSearchInput.focus()
                }
            })
        },
        emitFilterEvent (filter) {
            if (_.isString(filter)) {
                filter = _.trim(filter)
            }
            this.$emit('update:filter', filter)
        }
    }
}
</script>
