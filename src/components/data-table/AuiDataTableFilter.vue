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
                :model-value="filterCriteria"
                data-cy="aui-data-table-filter-criteria"
                :options="filterCriteriaOptions"
                dense
                emit-value
                map-options
                :label="$t('Search by')"
                borderless
                :disable="loading || disabled"
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
                @input="emitFilterEvent($event)"
            />
            <aui-input-search
                v-if="!showDateInput"
                ref="toolbarSearchInput"
                :key="'toolbarSearchInput' + Math.random()"
                data-cy="aui-input-search--datatable"
                :model-value="filter"
                :disable="loading || disabled"
                dense
                borderless
                autofocus
                @update:model-value="emitFilterEvent($event)"
            />
        </div>
    </div>
</template>

<script>
import AuiInputSearch from 'components/input/AuiInputSearch'
import AuiInputDateTime from 'components/input/AuiInputDateTime'
import _ from 'lodash'
export default {
    name: 'AuiDataTableFilter',
    components: { AuiInputSearch, AuiInputDateTime },
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
