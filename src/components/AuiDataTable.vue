<template>
    <div
        class="aui-data-table"
    >
        <div
            v-if="!fullscreen && showHeader"
            class="text-h6 text-weight-light q-pl-lg q-pr-lg"
        >
            {{ title }}
        </div>
        <portal
            v-if="!showHeader"
            to="page-toolbar-right"
        >
            <slot
                name="search"
            />
            <aui-data-table-filter
                v-if="isSearchable"
                ref="dataTableFilterToolbar"
                :filter="tableFilter"
                :filter-criteria="tableFilterCriteria"
                :filter-criteria-options="searchCriteriaOptions"
                :clear-filter-on-change="clearFilterOnChange"
                :disable="!isSearchable"
                :loading="tableLoading"
                @update:filter="updateFilterEvent($event, 'dataTableFilterToolbar')"
                @update:filter-criteria="updateFilterCriteriaEvent"
                @update:filter-and-filter-criteria="updateFilterAndFilterCriteriaEvent"
            />
        </portal>
        <portal
            v-if="!showHeader"
            to="page-toolbar-left"
        >
            <div
                class="row"
            >
                <aui-list-action
                    v-if="addable && $aclCan('create', 'entity.' + resource)"
                    :label="$t('Add')"
                    icon="add"
                    data-cy="aui-list-action--add"
                    :split="false"
                    :routes="addActionRoutes"
                    :disable="$attrs.loading || tableLoading"
                />
                <q-btn
                    v-if="editable && $aclCan('update', 'entity.' + resource)"
                    size="sm"
                    class="q-ml-sm"
                    color="primary"
                    unelevated
                    icon="edit_note"
                    icon-right="arrow_drop_down"
                    data-cy="aui-list-action--edit-menu-btn"
                    :disable="!selectedRow || !isRowEditable(selectedRow) || $attrs.loading || tableLoading"
                >
                    <aui-data-table-row-menu
                        v-if="selectedRow"
                        :row="selectedRow"
                        :row-key="rowKey"
                        :row-actions="rowActionMenuItems({ row: selectedRow })"
                        :is-terminate-btn-visible="false"
                    />
                </q-btn>
                <aui-list-action
                    v-if="showbuttonDelete && deletable && $aclCan('delete', 'entity.' + resource)"
                    class="q-ml-sm"
                    :label="deletionLabelCombined"
                    data-cy="aui-list-action--delete"
                    icon="delete"
                    color="negative"
                    :disable="!selectedRow || !isRowDeletable(selectedRow) || $attrs.loading || tableLoading"
                    @click.stop="confirmRowDeletion(selectedRow)"
                />
                <slot
                    name="list-actions"
                />
            </div>
        </portal>
        <q-table
            ref="table"
            :row-key="rowKey"
            flat
            dense
            :hide-bottom="disablePagination"
            :title="mainTitle"
            :selection="selection"
            :loading="mainLoading"
            :columns="internalColumns"
            :rows="rows"
            :fullscreen="fullscreen"
            :selected="selectedRows"
            :filter="tableFilterClientSide"
            :pagination="tablePagination"
            :no-data-label="getNoDataLabel"
            :no-results-label="getNoResultsLabel"
            @row-click="onRowClick"
            @request="requestEvent"
            @update:pagination="updatePaginationEvent"
            @selection="selectRow"
        >
            <template
                v-if="showHeader"
                #top-left
            >
                <div
                    v-if="fullscreen"
                    class="text-h6 text-weight-light q-pl-sm q-pr-sm q-pt-sm q-pb-sm"
                >
                    {{ title }}
                </div>
                <div
                    v-if="showHeaderActions"
                >
                    <slot
                        name="actions"
                        :selected="hasRowSelected"
                        :row="selectedRow || {}"
                        :loading="tableLoading"
                    />
                    <q-btn
                        v-if="resourceBasePath && addable && $aclCan('create', 'entity.' + resource)"
                        class="q-mr-xs"
                        icon="add"
                        unelevated
                        size="md"
                        color="primary"
                        :disable="tableLoading"
                        :label="$t('Add')"
                        :to="resourceAddPath"
                    />
                    <q-btn
                        v-if="resourceBasePath && editable && $aclCan('update', 'entity.' + resource)"
                        class="q-mr-xs"
                        icon="edit"
                        :label="$t('Edit')"
                        unelevated
                        size="md"
                        color="primary"
                        :disable="!hasRowSelected || (hasRowSelected && !isRowEditable(selectedRow)) || tableLoading"
                        :to="resourceEditPath(selectedRow)"
                    />
                    <q-btn
                        v-if="deletable && $aclCan('delete', 'entity.' + resource)"
                        class="q-mr-xs"
                        :icon="deletionIcon"
                        :label="deletionLabelCombined"
                        unelevated
                        size="md"
                        color="negative"
                        :disable="!hasRowSelected || (hasRowSelected && !isRowDeletable(selectedRow)) || tableLoading"
                        @click="confirmRowDeletion(selectedRow)"
                    />
                </div>
            </template>
            <template
                v-if="showHeader"
                #top-right
            >
                <aui-data-table-filter
                    v-if="isSearchable"
                    ref="dataTableFilterTopRight"
                    :filter="tableFilter"
                    :filter-criteria="tableFilterCriteria"
                    :filter-criteria-options="searchCriteriaOptions"
                    :disable="!isSearchable"
                    :loading="tableLoading"
                    @update:filter="updateFilterEvent($event, 'dataTableFilterTopRight')"
                    @update:filter-criteria="updateFilterCriteriaEvent"
                />
                <aui-more-menu
                    v-if="showMoreMenuSearch"
                    class="q-ml-sm"
                    :disable="tableLoading"
                >
                    <aui-popup-menu-item
                        icon="refresh"
                        :label="$t('Refresh')"
                        @click="refresh({ force: true })"
                    />
                    <aui-popup-menu-item
                        v-if="!fullscreen"
                        icon="fullscreen"
                        :label="$t('Fullscreen')"
                        @click="fullscreen=true"
                    />
                    <aui-popup-menu-item
                        v-if="fullscreen"
                        icon="fullscreen_exit"
                        :label="$t('Exit Fullscreen')"
                        @click="fullscreen=false"
                    />
                </aui-more-menu>
            </template>
            <template
                #body-cell="props"
            >
                <q-td
                    :key="(props && props.col && props.col.name) || 'noname'"
                    class="ellipsis"
                    :props="props"
                    @click.stop="handleRowClick(props.row, props.rowIndex)"
                >
                    <template
                        v-if="props.col.component && (props.col.editable === true ||
                            (typeof(props.col.editable) === 'function' && props.col.editable(props) === true))"
                    >
                        <q-toggle
                            v-if="props.col.component === 'toggle'"
                            data-cy="aui-data-table-inline-edit--toggle"
                            :model-value="$toBoolean(props.value)"
                            :disable="isColumnDisabled(props)"
                            :icon="props.col.icon"
                            @update:model-value="saveTableCellInput(props.col.name, $event, props)"
                        />
                        <q-checkbox
                            v-else-if="props.col.component === 'checkbox'"
                            data-cy="aui-data-table-inline-edit--checkbox"
                            :model-value="$toBoolean(props.value)"
                            :disable="isColumnDisabled(props)"
                            @update:model-value="saveTableCellInput(props.col.name, $event, props)"
                        />
                        <aui-data-table-edit-input
                            v-else-if="props.col.component === 'input'"
                            data-cy="aui-data-table-inline-edit--input"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            :highlighted="hasTableFilter && (props.col.field === tableFilterCriteria || resourceType === 'ajax')"
                            :search-term="tableFilter"
                            @save="saveTableCellInput($event.column.name, $event.value, props)"
                        />
                        <aui-data-table-edit-select
                            v-else-if="props.col.component === 'select'"
                            data-cy="aui-data-table-inline-edit--select"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            :highlighted="hasTableFilter && (props.col.field === tableFilterCriteria || resourceType === 'ajax')"
                            :search-term="tableFilter"
                            @save="saveTableCellInput($event.column.name, $event.value, props)"
                        />
                        <aui-data-table-edit-select-lazy
                            v-else-if="props.col.component === 'select-lazy'"
                            data-cy="aui-data-table-inline-edit--select-lazy"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            @save="saveTableCellInput($event.column.componentField, $event.value, props)"
                        />
                        <template
                            v-else-if="props.col.component === 'custom'"
                        >
                            <slot
                                :name="'custom-component-' + props.col.name"
                                :model-value="props.value"
                                :col="props.col"
                                :row="props.row"
                            />
                        </template>
                    </template>
                    <template
                        v-else-if="['more-menu-right', 'more-menu-left'].includes(props.col.name)"
                    >
                        <q-btn
                            v-if="(editable && $aclCan('update', 'entity.' + resource)) ||
                                (editable && $aclCan('update', 'entity.' + resource, props.row, user)) ||
                                (deletable && $aclCan('delete', 'entity.' + resource)) || showMoreMenu"
                            size="md"
                            class="q-ml-sm"
                            color="primary"
                            flat
                            dense
                            icon="more_vert"
                            data-cy="row-more-menu-btn"
                            :disable="(!hasMenuItems(props.row) && !showMoreMenu) ||
                                (!isRowEditable(props.row) && !isRowDeletable(props.row) && !showMoreMenu) ||
                                $attrs.loading || tableLoading"
                        >
                            <aui-data-table-row-menu
                                v-if="hasMenuItems(props.row) || showMoreMenu"
                                :row="props.row"
                                :row-actions="rowActionMenuItems({ row: props.row })"
                                :is-terminate-btn-visible="isTerminateBtnVisible(props.row)"
                                :deletion-icon="deletionIcon"
                                :deletion-label="deletionLabelCombined"
                                @delete="confirmRowDeletion(props.row, props.rowIndex)"
                            />
                        </q-btn>
                    </template>
                    <template
                        v-else-if="props.col.component && props.col.component === 'json'"
                    >
                        <aui-data-table-json
                            :value="props.row[props.col.componentField]"
                        />
                    </template>
                    <template
                        v-else-if="props.value === '' || props.value === undefined || props.value === null"
                    >
                        {{ $t('N/A') }}
                    </template>
                    <aui-data-table-highlighted-text
                        v-else
                        :highlighted="hasTableFilter && (props.col.field === tableFilterCriteria || resourceType === 'ajax')"
                        :highlighted-text="formatColumn(props)"
                        :search-term="tableFilter"
                    />
                </q-td>
            </template>
            <template
                #bottom="{ pagesNumber }"
            >
                <aui-data-table-pagination
                    class="col-auto q-mr-md"
                    :loading="tableLoading"
                    :pages-number="pagesNumber"
                    :value="tablePagination.page"
                    @input="updatePageEvent"
                />
                <aui-data-table-rows-per-page-selection
                    class="col-auto q-mr-md"
                    :loading="tableLoading"
                    :rows-per-page-options="rowsPerPageOptions"
                    :value="tablePagination.rowsPerPage"
                    @input="updateRowsPerPageEvent"
                />
                <aui-data-table-rows-number
                    class="col-auto"
                    :loading="tableLoading"
                    :value="tableRowsNumber"
                />
            </template>
        </q-table>
        <slot
            name="default"
        />
    </div>
</template>

<script>
import _ from 'lodash'
import AuiMoreMenu from 'components/AuiMoreMenu'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
import AuiDataTableEditSelect from 'components/AuiDataTableEditSelect'
import AuiDataTableEditInput from 'components/AuiDataTableEditInput'
import AuiDataTableEditSelectLazy from 'components/AuiDataTableEditSelectLazy'
import {
    mapActions, mapMutations, mapState
} from 'vuex'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import {
    getDataTableDescending,
    getDataTableFilter,
    getDataTableFilterCriteria,
    getDataTablePage,
    getDataTableRowsPerPage,
    getDataTableSortBy, setDataTableDescending,
    setDataTableFilter,
    setDataTableFilterCriteria,
    setDataTablePage,
    setDataTableRowsPerPage,
    setDataTableSortBy
} from 'src/helpers/dataTable'
import AuiListAction from 'components/AuiListAction'
import AuiDataTableRowMenu from 'components/AuiDataTableRowMenu'
import { markErrorAsHandled } from 'src/helpers/errorHandling'
import AuiDataTableRowsPerPageSelection from 'components/data-table/AuiDataTableRowsPerPageSelection'
import AuiDataTablePagination from 'components/data-table/AuiDataTablePagination'
import AuiDataTableRowsNumber from 'components/data-table/AuiDataTableRowsNumber'
import AuiDataTableFilter from 'components/data-table/AuiDataTableFilter'
import AuiDataTableHighlightedText from 'components/data-table/AuiDataTableHighlightedText'
import ApiExpand from 'src/helpers/api-expand'
import AuiDataTableJson from 'components/data-table/AuiDataTableJson'
export default {
    name: 'AuiDataTable',
    components: {
        AuiDataTableJson,
        AuiDataTableHighlightedText,
        AuiDataTableFilter,
        AuiDataTableRowsNumber,
        AuiDataTablePagination,
        AuiDataTableRowsPerPageSelection,
        AuiDataTableRowMenu,
        AuiListAction,
        AuiDataTableEditSelectLazy,
        AuiDataTableEditInput,
        AuiDataTableEditSelect,
        AuiPopupMenuItem,
        AuiMoreMenu
    },
    props: {
        tableId: {
            type: String,
            required: true
        },
        rowKey: {
            type: String,
            default: 'id'
        },
        resource: {
            type: String,
            required: true
        },
        resourcePath: {
            type: String,
            default: null
        },
        resourceSearchField: {
            type: String,
            default: undefined
        },
        resourceSearchWildcard: {
            type: Boolean,
            default: false
        },
        resourceDefaultFilters: {
            type: [Object, Function],
            default: undefined
        },
        rowResource: {
            type: Function,
            default: undefined
        },
        onRowClick: {
            type: Function,
            default: undefined
        },
        onRowClickSelect: {
            type: Boolean,
            default: false
        },
        resourceBasePath: {
            type: String,
            default: undefined
        },
        resourceSingular: {
            type: String,
            required: true
        },
        resourceType: {
            type: String,
            required: true,
            validator (value) {
                return ['api', 'ajax'].includes(value)
            }
        },
        resourceAlt: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: true
        },
        columns: {
            type: Array,
            default: undefined
        },
        loading: {
            type: Boolean,
            default: false
        },
        searchable: {
            type: Boolean,
            default: false
        },
        deletable: {
            type: Boolean,
            default: false
        },
        rowDeletable: {
            type: Function,
            default () {
                return this.deletable
            }
        },
        addable: {
            type: Boolean,
            default: false
        },
        addActionRoutes: {
            type: Array,
            default () {
                return []
            }
        },
        editable: {
            type: Boolean,
            default: false
        },
        rowEditable: {
            type: Function,
            default () {
                return this.editable
            }
        },
        deletionIcon: {
            type: String,
            default: 'delete'
        },
        deletionLabel: {
            type: String,
            default: null
        },
        deletionTitle: {
            type: String,
            default: null
        },
        deletionText: {
            type: String,
            default: null
        },
        deletionSubject: {
            type: String,
            default: 'id'
        },
        deletionExtraConfirm: {
            type: Object,
            default: undefined
        },
        deletionAction: {
            type: String,
            default: undefined
        },
        useClientSideFilteringAndPagination: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        rowMenuRouteNames: {
            type: Array,
            default () {
                return []
            }
        },
        rowMenuRouteIntercept: {
            type: Function,
            default ({ route }) {
                return route
            }
        },
        editRouteName: {
            type: String,
            default: undefined
        },
        showMoreMenuSearch: {
            type: Boolean,
            default: true
        },
        showHeaderActions: {
            type: Boolean,
            default: true
        },
        dataRequestAction: {
            type: String,
            default: 'dataTable/request'
        },
        searchCriteriaConfig: {
            type: Array,
            default: null
        },
        searchCriteriaUseColumns: {
            type: Boolean,
            default: false
        },
        maxSelectedRows: {
            type: Number,
            default: 1
        },
        rowActions: {
            type: Function,
            default () {
                return []
            }
        },
        useApiV2: {
            type: Boolean,
            default: false
        },
        showMoreMenu: {
            type: Boolean,
            default: false
        },
        selection: {
            type: String,
            default: 'single'
        },
        clearFilterOnChange: {
            type: Boolean,
            default: false
        },
        disablePagination: {
            type: Boolean,
            default: false
        },
        showbuttonDelete: {
            type: Boolean,
            default: true
        }
    },
    emits: ['rows-selected', 'row-selected', 'select'],
    data () {
        return {
            selectedRows: [],
            fullscreen: false,
            restoreFocusTo: '',
            tableRouteName: null
        }
    },
    computed: {
        ...mapState('user', [
            'user'
        ]),
        internalTableId () {
            return this.tableRouteName + '_' + this.resource + '_' + this.tableId
        },
        tableFilter () {
            return this.$store.state.dataTable[this.internalTableId + 'Filter']
        },
        hasTableFilter () {
            return this.tableFilter !== undefined && this.tableFilter !== null && _.trim(this.tableFilter) !== ''
        },
        tableFilterClientSide () {
            if (this.useClientSideFilteringAndPagination) {
                return this.tableFilter
            } else {
                return undefined
            }
        },
        tableFilterMethodClientSide () {
            if (this.useClientSideFilteringAndPagination) {
                return {
                    rows: [this.tableFilterCriteria]
                }
            } else {
                return undefined
            }
        },
        tableFilterCriteria () {
            return this.$store.state.dataTable[this.internalTableId + 'FilterCriteria']
        },
        tablePagination () {
            const rowsNumber = this.$store.state.dataTable[this.internalTableId + 'RowsNumber']
            return {
                page: this.$store.state.dataTable[this.internalTableId + 'Page'],
                rowsPerPage: this.$store.state.dataTable[this.internalTableId + 'RowsPerPage'],
                sortBy: this.$store.state.dataTable[this.internalTableId + 'SortBy'],
                descending: this.$store.state.dataTable[this.internalTableId + 'Descending'],
                ...((!this.useClientSideFilteringAndPagination) ? { rowsNumber: rowsNumber } : {})
            }
        },
        tableRowsNumber () {
            return this.$store.state.dataTable[this.internalTableId + 'RowsNumber'] || 0
        },
        waitIdentifier () {
            return 'aui-data-table-' + this.internalTableId
        },
        tableLoading () {
            return this.$wait.is(this.waitIdentifier + '*')
        },
        rows () {
            return this.$store.state.dataTable[this.internalTableId + 'Rows'] || []
        },
        currentServerSideFilter () {
            return this.$store.state.dataTable[this.internalTableId + 'Filter']
        },
        internalColumns () {
            const internalColumns = _.cloneDeep(this.columns)
            let finalColumns = []
            finalColumns.push({
                name: 'more-menu-left',
                label: '',
                field: 'menu',
                align: 'right',
                style: 'width: 0'
            })
            const availableColumns = new Set()
            if (this.rows && this.rows.length > 0) {
                this.rows.forEach((row) => {
                    internalColumns.forEach((column) => {
                        if (_.isString(column.field) && _.has(row, column.field)) {
                            availableColumns.add(column.field)
                        }
                    })
                })
                internalColumns.forEach((column) => {
                    const aclResource = 'entity.' + this.resource + '.columns.' + column.name
                    if (availableColumns.has(column.field) && this.$aclCan('read', aclResource)) {
                        if (_.isString(column.field) && column.field.indexOf('.') > -1) {
                            const fieldPath = column.field
                            column.field = (row) => {
                                return _.get(row, fieldPath)
                            }
                        }
                        finalColumns.push(column)
                    }
                })
            } else {
                finalColumns = internalColumns
            }
            finalColumns.push({
                name: 'more-menu-right',
                label: '',
                field: 'menu',
                align: 'right',
                style: 'width: 0'
            })
            return finalColumns
        },
        pureColumns () {
            const pureColumns = []
            this.columns.forEach((column) => {
                pureColumns.push(column.field)
            })
            return pureColumns
        },
        patchError () {
            return this.$store.state.dataTable[this.internalTableId + 'PatchError']
        },
        mainTitle () {
            if (this.showHeader) {
                return this.title
            } else {
                return undefined
            }
        },
        mainLoading () {
            if (!this.showHeader) {
                return false
            } else {
                return this.tableLoading
            }
        },
        hasRowSelected () {
            return !!this.selectedRows && this.selectedRows.length > 0
        },
        selectedRow () {
            return this.selectedRows[0]
        },
        resourceAddPath () {
            return this.resourceBasePath + '/create'
        },
        deletionLabelCombined () {
            return this.deletionLabel || this.$t('Delete')
        },
        deletionTitleCombined () {
            return this.deletionTitle || 'Delete {resource}'
        },
        deletionTextCombined () {
            return this.deletionText || 'You are about to delete {resource} {subject} {extraText}'
        },
        rowsPerPageOptions () {
            return [5, 10, 15, 20, 25, 35, 50, 100, 250, 0]
        },
        getNoDataLabel () {
            const noDataLabel = this.$t('No data available')
            if (this.useClientSideFilteringAndPagination) {
                return noDataLabel
            } else {
                return (this.tableFilter) ? this.getNoResultsLabel : noDataLabel
            }
        },
        getNoResultsLabel () {
            return this.$t('No matching records found')
        },
        searchCriteriaOptions () {
            const criteriaOptions = []
            if (this.searchCriteriaUseColumns || this.useClientSideFilteringAndPagination) {
                this.columns.forEach((column) => {
                    criteriaOptions.push({
                        value: column.field,
                        label: column.label
                    })
                })
            } else {
                if (this.resourceType === 'ajax') {
                    criteriaOptions.push({
                        value: 'all',
                        label: this.$t('All')
                    })
                }
                if (this.searchCriteriaConfig && this.searchCriteriaConfig.length > 0) {
                    this.searchCriteriaConfig.forEach((criteriaConfig) => {
                        if (criteriaConfig?.component && criteriaConfig.component === 'input_date') {
                            criteriaOptions.push({
                                value: criteriaConfig.criteria,
                                label: criteriaConfig.label,
                                isInputDate: true
                            }) 
                        } else {
                            criteriaOptions.push({
                                value: criteriaConfig.criteria,
                                label: criteriaConfig.label
                            }) 
                        }
                    })
                }
            }
            return criteriaOptions
        },
        isSearchable () {
            const isApiSearch = this.resourceType === 'api' && this.searchCriteriaConfig && this.searchCriteriaConfig.length > 0
            return this.searchable && (this.resourceType === 'ajax' || isApiSearch)
        }
    },
    watch: {
        selectedRows (selectedRows) {
            this.$emit('rows-selected', selectedRows)
            this.$emit('row-selected', {
                data: this.selectedRow,
                deletable: this.isRowDeletable(this.selectedRow),
                editable: this.isRowEditable(this.selectedRow)
            })
        },
        patchError (error) {
            if (error) {
                showGlobalErrorMessage(error)
            }
        }
    },
    async mounted () {
        await this.initialize()
    },
    unmounted () {
        this.destroyData({
            tableId: this.internalTableId
        })
    },
    methods: {
        ...mapMutations('dataTable', [
            'setFilter',
            'setFilterCriteria',
            'setPage',
            'setRowsPerPage',
            'setSortBy',
            'setDescending',
            'setRowsNumber',
            'destroyData'
        ]),
        ...mapActions('dataTable', [
            'patchResource'
        ]),
        handleRowClick (row, rowIndex) {
            if (!this.onRowClickSelect) {
                return 
            }
            this.onRowClick(row, rowIndex)
        },
        async initialize () {
            this.tableRouteName = this.$route.name
            this.updateFilter(getDataTableFilter({
                tableId: this.internalTableId
            }))
            this.updateFilterCriteria(getDataTableFilterCriteria({
                tableId: this.internalTableId, defaultValue: this.getDefaultFilterCriteria()
            }))
            this.updatePage(getDataTablePage({
                tableId: this.internalTableId
            }))
            this.updateRowsPerPage(getDataTableRowsPerPage({
                tableId: this.internalTableId
            }))
            this.updateSortBy(getDataTableSortBy({
                tableId: this.internalTableId
            }))
            this.updateDescending(getDataTableDescending({
                tableId: this.internalTableId
            }))
            if (!this.useClientSideFilteringAndPagination) {
                this.setRowsNumber({ tableId: this.internalTableId, rowsNumber: 0 })
            }
            await this.refresh({ force: true })
        },
        clearSelectedRows () {
            this.selectedRows = []
        },
        updateFilterEvent (filter, elInputRefName) {
            this.restoreFocusTo = elInputRefName
            if (this.useClientSideFilteringAndPagination) {
                this.updateFilter(filter)
                this.updatePage(1)
            } else {
                this.refresh({ filter })
            }
        },
        updateFilterCriteriaEvent (filterCriteria) {
            if (this.useClientSideFilteringAndPagination) {
                this.updateFilterCriteria(filterCriteria)
            } else {
                this.refresh({ filterCriteria })
            }
        },
        updateFilterAndFilterCriteriaEvent ({ filterCriteria, filter }) {
            if (this.useClientSideFilteringAndPagination) {
                this.updateFilter(filter)
                this.updatePage(1)
                this.updateFilterCriteria(filterCriteria)
            } else {
                this.refresh({ filterCriteria, filter })
            }
        },
        updatePageEvent (page) {
            if (this.useClientSideFilteringAndPagination) {
                this.updatePage(page)
            } else {
                this.refresh({ page })
            }
        },
        updatePaginationEvent (pagination) {
            if (this.useClientSideFilteringAndPagination) {
                this.updateSortBy(pagination.sortBy)
                this.updateDescending(pagination.descending)
            }
        },
        requestEvent ({ pagination }) {
            if (!this.useClientSideFilteringAndPagination) {
                this.refresh({
                    sortBy: pagination.sortBy,
                    descending: pagination.descending
                })
            }
        },
        updateRowsPerPageEvent (rowsPerPage) {
            if (this.useClientSideFilteringAndPagination) {
                this.updateRowsPerPage(rowsPerPage)
                this.updatePage(1)
            } else {
                this.refresh({ rowsPerPage })
            }
        },
        updateFilter (filter) {
            if (filter !== this.tableFilter) {
                this.setFilter({ tableId: this.internalTableId, filter })
                setDataTableFilter({ tableId: this.internalTableId, filter })
            }
        },
        updateFilterCriteria (filterCriteria) {
            this.setFilterCriteria({ tableId: this.internalTableId, filterCriteria })
            setDataTableFilterCriteria({ tableId: this.internalTableId, filterCriteria })
        },
        updatePage (page) {
            this.setPage({ tableId: this.internalTableId, page })
            setDataTablePage({ tableId: this.internalTableId, page })
        },
        updateRowsPerPage (rowsPerPage) {
            this.setRowsPerPage({ tableId: this.internalTableId, rowsPerPage })
            setDataTableRowsPerPage({ tableId: this.internalTableId, rowsPerPage })
        },
        updateSortBy (sortBy) {
            this.setSortBy({ tableId: this.internalTableId, sortBy })
            setDataTableSortBy({ tableId: this.internalTableId, sortBy })
        },
        updateDescending (descending) {
            this.setDescending({ tableId: this.internalTableId, descending })
            setDataTableDescending({ tableId: this.internalTableId, descending })
        },
        async requestData ({ filter = '', filterCriteria = null, pagination }) {
            if (this.useClientSideFilteringAndPagination) {
                filter = null
                pagination.page = 1
            }
            this.$wait.start(this.waitIdentifier)
            try {
                let resource = this.useApiV2 ? 'v2/' + this.resource : this.resource
                if (this.resourcePath) {
                    resource = this.useApiV2 ? 'v2/' + this.resourcePath : this.resourcePath
                }
                let searchField = this.resourceSearchField
                const defaultListFilters = this.getListFilters()
                if (filter && filter !== '' && filterCriteria) {
                    searchField = filterCriteria
                    delete defaultListFilters[filterCriteria]
                }
                let searchWildcard = this.resourceSearchWildcard
                const searchCriteriaConfig = this.searchCriteriaConfig?.find(config => config.criteria === filterCriteria)
                if (searchCriteriaConfig && _.has(searchCriteriaConfig, 'wildcard')) {
                    searchWildcard = searchCriteriaConfig.wildcard
                }
                if (searchField && searchCriteriaConfig && _.has(searchCriteriaConfig, 'exclude')) {
                    searchCriteriaConfig.exclude.forEach((exclude) => {
                        delete defaultListFilters[exclude]
                    })
                }
                await this.$store.dispatch(this.dataRequestAction, {
                    tableId: this.internalTableId,
                    resource: resource,
                    resourceType: this.resourceType,
                    resourceAlt: this.resourceAlt,
                    resourceSearchField: searchField,
                    resourceSearchWildcard: searchWildcard,
                    resourceDefaultFilters: defaultListFilters,
                    pagination,
                    filter: filter,
                    filterCriteria: filterCriteria,
                    columns: this.pureColumns,
                    isClientTableNavigation: this.useClientSideFilteringAndPagination
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
            }
        },
        /**
         * Main method to reload the data table with all it's current state (filter, page, rowsPerPage, sortBy, etc.)
         * @param filter {String}
         * @param filterCriteria {String}
         * @param page {Number}
         * @param rowsPerPage {Number}
         * @param sortBy {String}
         * @param descending {Boolean}
         * @param force {Boolean}
         * @returns {Promise<void>}
         */
        async refresh ({
            filter = undefined,
            filterCriteria = undefined,
            page = undefined,
            rowsPerPage = undefined,
            sortBy = undefined,
            descending = undefined,
            force = false
        }) {
            if (_.isNumber(page) && page < 1) {
                page = 1
            }
            const hasPageChanged = page !== undefined && page !== this.tablePagination.page
            const hasRowsPerPageChanged = rowsPerPage !== undefined && rowsPerPage !== this.tablePagination.rowsPerPage
            const hasSortByChanged = sortBy !== undefined && sortBy !== this.tablePagination.sortBy
            const hasDescendingChanged = descending !== undefined && descending !== this.tablePagination.descending
            const hasFilterChanged = filter !== undefined && filter !== this.tableFilter
            const hasFilterCriteriaChanged = filterCriteria !== undefined && filterCriteria !== this.tableFilterCriteria
            const hasChanged = hasPageChanged || hasRowsPerPageChanged || hasSortByChanged ||
                hasDescendingChanged || hasFilterChanged || hasFilterCriteriaChanged
            const hasRows = this.rows && this.rows.length && this.rows.length > 0

            if (hasChanged || force || (!hasRows && this.useClientSideFilteringAndPagination)) {
                let finalPage = this.tablePagination.page
                if (hasPageChanged) {
                    finalPage = page
                    this.updatePage(finalPage)
                }
                let finalRowsPerPage = this.tablePagination.rowsPerPage
                if (hasRowsPerPageChanged) {
                    finalRowsPerPage = rowsPerPage
                    this.updateRowsPerPage(finalRowsPerPage)
                    finalPage = 1
                    this.updatePage(1)
                }
                let finalSortBy = this.tablePagination.sortBy
                if (hasSortByChanged) {
                    finalSortBy = sortBy
                    this.updateSortBy(finalSortBy)
                }
                let finalDescending = this.tablePagination.descending
                if (hasDescendingChanged) {
                    finalDescending = descending
                    this.updateDescending(finalDescending)
                }
                let finalFilter = this.tableFilter
                if (hasFilterChanged) {
                    finalFilter = filter
                    this.updateFilter(finalFilter)
                    finalPage = 1
                    this.updatePage(1)
                }
                let finalFilterCriteria = this.tableFilterCriteria
                if (hasFilterCriteriaChanged) {
                    finalFilterCriteria = filterCriteria
                    this.updateFilterCriteria(filterCriteria)
                    finalPage = 1
                    this.updatePage(1)
                }
                this.clearSelectedRows()
                await this.requestData({
                    filter: finalFilter,
                    filterCriteria: finalFilterCriteria,
                    pagination: {
                        page: finalPage,
                        rowsPerPage: finalRowsPerPage,
                        sortBy: finalSortBy,
                        descending: finalDescending
                    }
                })
                this.restoreFocus()
                if (this.tablePagination.page > 1 && this.rows.length === 0) {
                    await this.refresh({ page: 1 })
                }
            }
        },
        restoreFocus () {
            if (this.restoreFocusTo && this.$refs[this.restoreFocusTo]) {
                this.$refs[this.restoreFocusTo].focus()
            }
        },
        async patchField (field, value, { row, col }) {
            let resource = this.useApiV2 ? 'v2/' + this.resource : this.resource
            if (this.resourcePath) {
                resource = this.useApiV2 ? 'v2/' + this.resourcePath : this.resourcePath
            }
            if (this.rowResource) {
                resource = this.rowResource(row)
            }
            await this.patchResourceField({
                resource,
                resourceId: row[this.rowKey],
                field,
                value,
                row,
                col
            })
        },
        async patchResourceField ({
            resource,
            resourceId,
            field,
            value,
            row,
            col
        }) {
            const colId = this.waitIdentifier + '-row-' + row[this.rowKey] + '-col-' + col.name
            this.$wait.start(this.waitIdentifier)
            this.$wait.start(colId)
            try {
                await this.patchResource({
                    tableId: this.internalTableId,
                    resource: resource,
                    resourceId: resourceId,
                    resourceField: field,
                    resourceValue: value,
                    resourceDefaultFilters: this.getUpdateFilters({
                        row: row
                    })
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
                this.$wait.end(colId)
                await this.refresh({ force: true })
            }
        },
        confirmRowDeletion (row, rowIndex) {
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                componentProps: {
                    title: this.$t(this.deletionTitleCombined, {
                        resource: this.resourceSingular
                    }),
                    icon: this.deletionIcon,
                    text: this.$t(this.deletionTextCombined, {
                        resource: this.resourceSingular,
                        subject: row[this.deletionSubject]
                    }),
                    buttonIcon: this.deletionIcon,
                    buttonLabel: this.deletionLabelCombined
                }
            }).onOk(async () => {
                if (this.deletionExtraConfirm) {
                    await this.extraConfirmRowDeletion(row, rowIndex)
                } else {
                    await this.deleteRow(row, rowIndex)
                }
            })
        },
        async extraConfirmRowDeletion (row, rowIndex) {
            let placeholders
            this.$wait.start(this.waitIdentifier)
            try {
                placeholders = await Promise.all(this.deletionExtraConfirm.items.map(async item => {
                    const params = {
                        rows: 1
                    }
                    if (item.filter) {
                        params[item.filter] = row[item.filterValue]
                    }
                    const value = await this.$store.dispatch(item.action, {
                        params: params
                    })
                    return item.skipCheck?.(value) ? null : value
                }))
                if (!placeholders.includes(null)) { // all placeholders should be !null to trigger the popup
                    this.$q.dialog({
                        component: NegativeConfirmationDialog,
                        componentProps: {
                            title: this.$t(this.deletionTitleCombined, {
                                resource: this.resourceSingular
                            }),
                            icon: this.deletionIcon,
                            text: this.$t(this.deletionTextCombined, {
                                resource: this.resourceSingular,
                                subject: row[this.deletionSubject],
                                extraText: this.$t(this.deletionExtraConfirm.text, placeholders)
                            }),
                            buttonIcon: this.deletionIcon,
                            buttonLabel: this.deletionLabelCombined
                        }
                    }).onOk(async () => {
                        await this.deleteRow(row, rowIndex)
                    })
                } else {
                    await this.deleteRow(row, rowIndex)
                }
            } finally {
                this.$wait.end(this.waitIdentifier)
            }
        },
        async deleteRow (row, rowIndex) {
            let resource = this.useApiV2 ? 'v2/' + this.resource : this.resource
            if (this.resourcePath) {
                resource = this.useApiV2 ? 'v2/' + this.resourcePath : this.resourcePath
            }
            if (this.rowResource) {
                resource = this.rowResource(row)
            }
            let action = 'dataTable/deleteResource'
            if (this.deletionAction) {
                action = this.deletionAction
            }
            this.$wait.start(this.waitIdentifier)
            try {
                await this.$store.dispatch(action, {
                    tableId: this.internalTableId,
                    resource: resource,
                    resourceAlt: this.resourceAlt,
                    resourceBasePath: this.resourceBasePath,
                    resourceId: row[this.rowKey],
                    resourceDefaultFilters: this.getDeletionFilters({ row }),
                    rowIndex: rowIndex
                })
            } catch (error) {
                showGlobalErrorMessage(error)
                markErrorAsHandled(error)
            } finally {
                this.$wait.end(this.waitIdentifier)
                const lastPageAfter = Math.ceil((this.tableRowsNumber - 1) / this.tablePagination.rowsPerPage)
                const lastPage = Math.ceil((this.tableRowsNumber) / this.tablePagination.rowsPerPage)
                let newPage = this.tablePagination.page
                if (this.tablePagination.page === lastPage && lastPageAfter !== lastPage) {
                    newPage = lastPageAfter
                }
                await this.refresh({ page: newPage, force: true })
            }
        },
        isColumnDisabled (props) {
            const colResource = 'entity.' + this.resource + '.columns.' + props.col.name
            const isColumnEditable = this.$aclCan('update', colResource) ||
                this.$aclCan('update', colResource, props.row, this.user)
            return !(this.isRowEditable(props.row) && isColumnEditable) || this.tableLoading
        },
        isRowDeletable (row) {
            return row && this.rowDeletable(row) && (this.$aclCan('delete', 'entity.' + this.resource) ||
                this.$aclCan('delete', 'entity.' + this.resource, row, this.user))
        },
        isRowEditable (row) {
            return this.rowEditable(row) && (this.$aclCan('update', 'entity.' + this.resource) ||
                this.$aclCan('update', 'entity.' + this.resource, row, this.user))
        },
        rowMenuRoute (routeName, row) {
            const route = { name: routeName, params: { [this.rowKey]: row[this.rowKey] } }
            return this.rowMenuRouteIntercept({
                route,
                row
            })
        },
        resourceEditPath (row) {
            if (row && this.resourceBasePath) {
                return '/' + this.resourceBasePath + '/' + row[this.rowKey] + '/edit'
            } else {
                return null
            }
        },
        rowActionMenuItems ({ row }) {
            const items = []
            this.rowActions({ row }).forEach((rowAction) => {
                if (_.isString(rowAction) || (_.isObject(rowAction) && _.has(rowAction, 'name'))) {
                    const route = this.rowMenuRoute(rowAction, row)
                    const routeData = this.$router.resolve(route)
                    if (routeData) {
                        const $p = _.get(routeData, 'meta.$p', {})
                        items.push({
                            id: routeData.name,
                            visible: this.$aclCan($p.operation, $p.resource) ||
                                this.$aclCan($p.operation, $p.resource, row, this.user),
                            icon: _.get(routeData, 'meta.icon'),
                            label: _.get(routeData, 'meta.label'),
                            color: 'primary',
                            to: route
                        })
                    }
                } else if (_.isObject(rowAction)) {
                    items.push(rowAction)
                }
            })
            return items
        },
        hasMenuItems (row) {
            return this.rowActionMenuItems({ row }).filter(item => item.visible).length > 0
        },
        isTerminateBtnVisible (row) {
            return !!row && this.deletable && !!this.isRowDeletable(row)
        },
        getDefaultFilters ({ operation, row }) {
            if (typeof this.resourceDefaultFilters === 'function') {
                return this.resourceDefaultFilters({
                    operation,
                    row
                })
            }
        },
        getListFilters () {
            let filters = this.getDefaultFilters({
                operation: 'get'
            })
            if (!filters && this.resourceDefaultFilters) {
                filters = this.resourceDefaultFilters
            } else if (!filters) {
                filters = {}
            }
            const expand = new ApiExpand()
            this.columns.forEach((column) => {
                if (column.expand) {
                    expand.add(column.expand)
                }
            })
            if (expand.size() > 0) {
                filters.expand = expand.toString()
            }
            return _.clone(filters)
        },
        getUpdateFilters ({ row }) {
            return this.getDefaultFilters({
                operation: 'update',
                row
            })
        },
        getDeletionFilters ({ row }) {
            return this.getDefaultFilters({
                operation: 'delete',
                row
            })
        },
        formatColumn (props) {
            if (_.isFunction(props?.col?.formatter)) {
                return props?.col?.formatter({ ...props })
            } else {
                return props.value
            }
        },
        getDefaultFilterCriteria () {
            if (this.searchCriteriaOptions.length > 0) {
                return this.searchCriteriaOptions[0].value
            }
        },
        saveTableCellInput (columnName, input, { row, col }) {
            if (_.isFunction(col.componentSaveFunction)) {
                col.componentSaveFunction({
                    input,
                    row,
                    col,
                    patch: ({ resource, resourceId, field, value }) => {
                        this.patchResourceField({
                            resource,
                            resourceId,
                            field,
                            value,
                            row,
                            col
                        })
                    }
                })
            } else {
                this.patchField(columnName, input, { row, col })
            }
        },
        selectRow ({ rows }) {
            const row = rows[0]
            const index = this.selectedRows.indexOf(row)
            if (this.maxSelectedRows === 1 && index > -1) {
                this.selectedRows = []
            } else if (this.maxSelectedRows === 1) {
                this.selectedRows = rows
            } else if (this.maxSelectedRows > 1 && index > -1) {
                this.selectedRows.splice(index, 1)
            } else if (this.maxSelectedRows > 1 && this.selectedRows.length < this.maxSelectedRows) {
                this.selectedRows.push(row)
            }
            if (row.timestamp) {
                this.selectedRows.sort((a, b) => {
                    if (a.timestamp > b.timestamp) {
                        return 1
                    } else if (a.timestamp < b.timestamp) {
                        return -1
                    } else {
                        return 0
                    }
                })
            }
            this.$emit('select', this.selectedRows)
        }
    }
}
</script>
