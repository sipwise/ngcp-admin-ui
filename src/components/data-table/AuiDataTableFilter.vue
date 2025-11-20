<template>
    <div
        class="row aui-data-table-filter"
        data-cy="aui-data-table-filter"
    >
        <div>
            <q-select
                :model-value="filterCriteria"
                data-cy="aui-data-table-filter-criteria"
                :options="filterCriteriaOptions"
                dense
                emit-value
                map-options
                :label="$t('Search by')"
                borderless
                :disable="loading || disabled"
                style="min-width: 90px"
                @update:model-value="emitFilterCriteria($event)"
            />
        </div>
        <div
            class="col-auto"
        >
            <aui-input-date-time
                v-if="showDateInput"
                class="aui-filter-input-date"
                :model-value="filter"
                :past-selectable="true"
                :error="false"
                :error-message="null"
                :disable="loading || disabled"
                :dense="true"
                :has-end-date="isToDate"
                @input="emitFilterEvent($event)"
            />
            <aui-input-search
                v-if="!showDateInput && !showDateRangeInput"
                ref="toolbarSearchInput"
                :key="'toolbarSearchInput' + Math.random()"
                data-cy="aui-input-search--datatable"
                :model-value="filter"
                :tooltip="selectedCriteria?.tooltip"
                :disable="loading || disabled"
                dense
                borderless
                autofocus
                @update:model-value="emitFilterEvent($event)"
            />
            <aui-input-date-time-period
                v-if="showDateRangeInput"
                :model-value="filter"
                :past-selectable="true"
                dense
                column-gutter-size="sm"
                :error="false"
                :error-message="null"
                :disable="loading || disabled"
                @input="emitFilterEvent($event)"
            />
        </div>
    </div>
</template>

<script>
import AuiInputDateTime from 'components/input/AuiInputDateTime'
import AuiInputDateTimePeriod from 'components/input/AuiInputDateTimePeriod'
import AuiInputSearch from 'components/input/AuiInputSearch'
import _ from 'lodash'
export default {
    name: 'AuiDataTableFilter',
    components: { AuiInputSearch, AuiInputDateTime, AuiInputDateTimePeriod },
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
            type: [String, Array],
            default: undefined
        },
        filterCriteriaOptions: {
            type: Array,
            default: undefined
        },
        filter: {
            type: [String, Object],
            default: undefined
        },
        clearFilterOnChange: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:filter-criteria', 'update:filter', 'update:filter-and-filter-criteria'],
    computed: {
        showDateInput () {
            return this.filterCriteriaOptions.find((criteria) => criteria.isInputDate && this.filterCriteria === criteria.value)
        },
        showDateRangeInput () {
            return this.filterCriteriaOptions.find(
                (criteria) =>
                    criteria.isInputDateRange &&
        _.isEqual(this.filterCriteria, criteria.value)
            )
        },
        isToDate () {
            return ['start_le'].includes(this.filterCriteria)
        },
        selectedCriteria () {
            return this.filterCriteriaOptions.find(
                (option) => option.value === this.filterCriteria
            )
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
        emitFilterEvent (value) {
            let transformedFilter = value

            // If the selected criteria is a date range filter,
            // transform the value into an object with separate start and end keys (e.g., { start_ge: ..., start_le: ... })

            const selected = this.filterCriteriaOptions.find((criteria) =>
                criteria.isInputDateRange && _.isEqual(this.filterCriteria, criteria.value)
            )
            if (selected && typeof value === 'object') {
                transformedFilter = {
                    [selected.value[0]]: value.start,
                    [selected.value[1]]: value.end
                }
            }
            this.$emit('update:filter', transformedFilter)
        },
        emitFilterCriteria (criteria) {
            if (!this.clearFilterOnChange) {
                this.$emit('update:filter-criteria', criteria)
            } else {
                this.$emit('update:filter-and-filter-criteria', { filterCriteria: criteria, filter: null })
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-filter-input-date
    padding-bottom: 0px
</style>
