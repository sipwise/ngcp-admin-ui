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
            <aui-input-search
                ref="toolbarSearchInput"
                :key="resource"
                data-cy="aui-input-search--datatable"
                :value="syncedFilter"
                :disable="!searchable || tableLoading"
                dense
                borderless
                @input="updateFilter($event, 'toolbarSearchInput')"
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
                        :row-menu-items="rowMenuItems(selectedRow)"
                        :is-edit-btn-visible="isEditBtnVisible(selectedRow)"
                        :is-terminate-btn-visible="false"
                        :has-edit-row-menu-route="hasEditRowMenuRoute(selectedRow)"
                        :resource-edit-path="resourceEditPath(selectedRow)"
                        :deletion-icon="deletionIcon"
                        :deletion-label="deletionLabelCombined"
                        @delete="confirmRowDeletion(selectedRow)"
                    >
                        <template
                            #row-more-menu
                        >
                            <slot
                                name="row-more-menu"
                                :row="selectedRow"
                            />
                        </template>
                    </aui-data-table-row-menu>
                </q-btn>
                <aui-list-action
                    v-if="deletable && $aclCan('delete', 'entity.' + resource)"
                    class="q-ml-sm"
                    :label="deletionLabelCombined"
                    data-cy="aui-list-action--delete"
                    icon="delete"
                    color="negative"
                    :disable="!selectedRow || !isRowDeletable(selectedRow) || $attrs.loading || tableLoading"
                    @click="confirmRowDeletion(selectedRow)"
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
            :title="mainTitle"
            selection="single"
            :loading="mainLoading"
            :columns="internalColumns"
            :data="rows"
            :fullscreen="fullscreen"
            :selected.sync="selectedRows"
            :filter="syncedFilterClientSide"
            :pagination.sync="internalPagination"
            :no-data-label="getNoDataLabel"
            :no-results-label="getNoResultsLabel"
            @request="requestEvent"
        >
            <template
                v-if="showHeader"
                v-slot:top-left
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
                v-slot:top-right
            >
                <aui-input-search
                    ref="searchInput"
                    :key="resource"
                    data-cy="aui-input-search--datatable"
                    :value="syncedFilter"
                    :disable="!searchable || tableLoading"
                    dense
                    @input="updateFilter($event, 'searchInput')"
                />
                <aui-more-menu
                    v-if="showMoreMenuSearch"
                    class="q-ml-sm"
                    :disable="tableLoading"
                >
                    <slot
                        v-slot:menu-prepend
                    />
                    <aui-popup-menu-item
                        icon="refresh"
                        :label="$t('Refresh')"
                        @click="refresh"
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
                    <slot
                        v-slot:menu-append
                    />
                </aui-more-menu>
            </template>
            <template
                v-slot:body-cell="props"
            >
                <q-td
                    :key="(props && props.col && props.col.name) || 'noname'"
                    class="ellipsis"
                    :props="props"
                >
                    <template
                        v-if="props.col.component && (props.col.editable === true ||
                            (typeof(props.col.editable) === 'function' && props.col.editable(props) === true))"
                    >
                        <q-toggle
                            v-if="props.col.component === 'toggle'"
                            data-cy="aui-data-table-inline-edit--toggle"
                            :value="$toBoolean(props.value)"
                            :disable="isColumnDisabled(props)"
                            :icon="props.col.icon"
                            @input="patchField(props.col.name, $event, props)"
                        />
                        <q-checkbox
                            v-else-if="props.col.component === 'checkbox'"
                            data-cy="aui-data-table-inline-edit--checkbox"
                            :value="$toBoolean(props.value)"
                            :disable="isColumnDisabled(props)"
                            @input="patchField(props.col.name, $event, props)"
                        />
                        <aui-data-table-edit-input
                            v-else-if="props.col.component === 'input'"
                            data-cy="aui-data-table-inline-edit--input"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            @save="patchField($event.column.name, $event.value, props)"
                        />
                        <aui-data-table-edit-select
                            v-else-if="props.col.component === 'select'"
                            data-cy="aui-data-table-inline-edit--select"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            @save="patchField($event.column.name, $event.value, props)"
                        />
                        <aui-data-table-edit-select-lazy
                            v-else-if="props.col.component === 'select-lazy'"
                            data-cy="aui-data-table-inline-edit--select-lazy"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            @save="patchField($event.column.componentField, $event.value, props)"
                        />
                        <template
                            v-else-if="props.col.component === 'custom'"
                        >
                            <slot
                                :name="'custom-component-' + props.col.name"
                                :value="props.value"
                                :col="props.col"
                                :row="props.row"
                            />
                        </template>
                    </template>
                    <template
                        v-else-if="['more-menu-right', 'more-menu-left'].includes(props.col.name)"
                    >
                        <q-btn
                            v-if="(editable || deletable) &&
                                ($aclCan('update', 'entity.' + resource) ||
                                    $aclCan('delete', 'entity.' + resource))"
                            size="md"
                            class="q-ml-sm"
                            color="primary"
                            flat
                            dense
                            icon="more_vert"
                            data-cy="row-more-menu-btn"
                            :disable="(!isRowEditable(props.row) && !isRowDeletable(props.row)) || $attrs.loading || tableLoading"
                        >
                            <aui-data-table-row-menu
                                v-if="hasMenuItems(props.row)"
                                :row="props.row"
                                :row-menu-items="rowMenuItems(props.row)"
                                :is-edit-btn-visible="isEditBtnVisible(props.row)"
                                :is-terminate-btn-visible="isTerminateBtnVisible(props.row)"
                                :has-edit-row-menu-route="hasEditRowMenuRoute(props.row)"
                                :resource-edit-path="resourceEditPath(props.row)"
                                :deletion-icon="deletionIcon"
                                :deletion-label="deletionLabelCombined"
                                @delete="confirmRowDeletion(props.row)"
                            >
                                <template
                                    #row-more-menu
                                >
                                    <slot
                                        name="row-more-menu"
                                        :row="props.row"
                                    />
                                </template>
                            </aui-data-table-row-menu>
                        </q-btn>
                    </template>
                    <template
                        v-else-if="props.value === '' || props.value === undefined || props.value === null"
                    >
                        {{ $t('N/A') }}
                    </template>
                    <template
                        v-else
                    >
                        {{ formatColumn(props) }}
                    </template>
                </q-td>
            </template>
            <template
                #bottom="props"
            >
                <div
                    class="col-auto q-mr-md"
                >
                    <q-pagination
                        boundary-links
                        direction-links
                        boundary-numbers
                        ellipses
                        size="sm"
                        unelevated
                        :disable="tableLoading"
                        :max-pages="2"
                        :max="props.pagesNumber"
                        :value="props.pagination.page"
                        @input="syncedPagination.page = $event"
                    />
                </div>
                <div
                    class="col-auto q-mr-md"
                >
                    <span
                        class="q-mr-xs"
                    >
                        {{ $t('Rows per page') }}:
                    </span>
                    <q-btn-dropdown
                        color="primary"
                        size="sm"
                        flat
                        :disable="tableLoading"
                        :label="(syncedPagination.rowsPerPage > 0) ? syncedPagination.rowsPerPage : $t('All')"
                    >
                        <q-list
                            dense
                        >
                            <q-item
                                v-for="(rowPerPage, index) in rowsPerPageOptions"
                                :key="index"
                                v-close-popup
                                dense
                                clickable
                                @click="syncedPagination.rowsPerPage = rowPerPage"
                            >
                                <q-item-section>
                                    <q-item-label
                                        v-if="rowPerPage > 0"
                                    >
                                        {{ rowPerPage }}
                                    </q-item-label>
                                    <q-item-label
                                        v-else
                                    >
                                        {{ $t('All') }}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>
                <div
                    class="col-auto"
                >
                    <span>
                        {{ $t('Rows found') }}: {{ rowsNumber }}
                    </span>
                </div>
            </template>
        </q-table>
        <slot
            name="default"
        />
    </div>
</template>

<script>
import AuiInputSearch from 'components/input/AuiInputSearch'
import _ from 'lodash'
import AuiMoreMenu from 'components/AuiMoreMenu'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
import AuiDataTableEditSelect from 'components/AuiDataTableEditSelect'
import AuiDataTableEditInput from 'components/AuiDataTableEditInput'
import AuiDataTableEditSelectLazy from 'components/AuiDataTableEditSelectLazy'
import {
    mapActions, mapState
} from 'vuex'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import { getDataTableOptions, storeDataTableOptions } from 'src/helpers/dataTable'
import AuiListAction from 'components/AuiListAction'
import AuiDataTableRowMenu from 'components/AuiDataTableRowMenu'
import { markErrorAsHandled } from 'src/helpers/errorHandling'
export default {
    name: 'AuiDataTable',
    components: {
        AuiDataTableRowMenu,
        AuiListAction,
        AuiDataTableEditSelectLazy,
        AuiDataTableEditInput,
        AuiDataTableEditSelect,
        AuiPopupMenuItem,
        AuiMoreMenu,
        AuiInputSearch
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
        }
    },
    data () {
        return {
            selectedRows: [],
            fullscreen: false,
            syncedPagination: null,
            syncedFilter: null,
            initialized: false,
            restoreFocusTo: ''
        }
    },
    computed: {
        ...mapState('user', [
            'user'
        ]),
        waitIdentifier () {
            return 'aui-data-table-' + this.tableId
        },
        tableLoading () {
            return this.$wait.is(this.waitIdentifier + '*')
        },
        rows () {
            return this.$store.state.dataTable[this.tableId + 'Rows'] || []
        },
        rowsNumber () {
            return this.$store.state.dataTable[this.tableId + 'Pagination']?.rowsNumber || 0
        },
        currentServerSideFilter () {
            return this.$store.state.dataTable[this.tableId + 'Filter']
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
            return this.$store.state.dataTable[this.tableId + 'PatchError']
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
            return this.deletionTitle || this.$t('Delete {resource}')
        },
        deletionTextCombined () {
            return this.deletionText || this.$t('You are about to delete {resource} {subject} {extraText}')
        },
        syncedFilterClientSide () {
            if (!this.useClientSideFilteringAndPagination) {
                return undefined
            } else {
                return this.syncedFilter
            }
        },
        rowsPerPageOptions () {
            return [5, 10, 15, 20, 25, 35, 50, 100, 250, 0]
        },
        internalPagination: {
            get () {
                const pagination = _.cloneDeep(this.syncedPagination || this.getDefaultPagination())
                if (!this.useClientSideFilteringAndPagination) {
                    pagination.rowsNumber = this.rowsNumber
                }
                return pagination
            },
            set (pagination) {
                const newPagination = _.cloneDeep(pagination)
                if (this.syncedPagination && (newPagination.sortBy !== this.syncedPagination.sortBy ||
                    newPagination.descending !== this.syncedPagination.descending)) {
                    newPagination.page = this.syncedPagination.page
                }
                delete newPagination.rowsNumber
                this.syncedPagination = newPagination
            }
        },
        getNoDataLabel () {
            const noDataLabel = this.$t('No data available')
            if (this.useClientSideFilteringAndPagination) {
                return noDataLabel
            } else {
                return (this.syncedFilter) ? this.getNoResultsLabel : noDataLabel
            }
        },
        getNoResultsLabel () {
            return this.$t('No matching records found')
        }
    },
    watch: {
        syncedPagination: {
            handler (pagination) {
                if (this.initialized && !this.useClientSideFilteringAndPagination) {
                    this.refresh({ pagination })
                } else if (this.initialized) {
                    this.saveFilterAndPagination()
                }
            },
            deep: true
        },
        syncedFilter (filter) {
            if (this.initialized && !this.useClientSideFilteringAndPagination) {
                this.refresh({ filter })
            } else if (this.initialized) {
                this.saveFilterAndPagination()
            }
        },
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
        this.loadFilterAndPagination()
        await this.refresh({ force: true })
        this.initialized = true
    },
    methods: {
        ...mapActions('dataTable', [
            'patchResource'
        ]),
        clearSelectedRows () {
            this.selectedRows = []
        },
        updateFilter (filter, elInputRefName) {
            this.restoreFocusTo = elInputRefName
            this.syncedFilter = filter
        },
        async requestData ({ filter = '', pagination }) {
            if (this.useClientSideFilteringAndPagination) {
                filter = null
                pagination.page = 1
            } else if (filter !== this.currentServerSideFilter) {
                pagination.page = 1
            }
            this.$wait.start(this.waitIdentifier)
            try {
                let resource = this.resource
                if (this.resourcePath) {
                    resource = this.resourcePath
                }
                await this.$store.dispatch('dataTable/request', {
                    tableId: this.tableId,
                    resource: resource,
                    resourceType: this.resourceType,
                    resourceAlt: this.resourceAlt,
                    resourceSearchField: this.resourceSearchField,
                    resourceSearchWildcard: this.resourceSearchWildcard,
                    resourceDefaultFilters: this.getListFilters(),
                    pagination,
                    filter,
                    columns: this.pureColumns
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
            }
        },
        /**
         * Main method to reload the data table with all it's current state (filter, page, rowsPerPage, sortBy, etc.)
         * @param filter {String}
         * @param pagination
         * @param force {Boolean}
         * @returns {Promise<void>}
         */
        async refresh ({ filter = undefined, pagination = undefined, force = false } = {}) {
            if (filter !== this.syncedFilter || !_.isEqual(pagination, this.syncedPagination)) {
                const hasRows = this.rows && this.rows.length > 0
                this.saveFilterAndPagination({ filter, pagination })
                if (force || !this.useClientSideFilteringAndPagination ||
                    (this.useClientSideFilteringAndPagination && !hasRows)) {
                    this.clearSelectedRows()
                    await this.requestData({
                        filter: this.syncedFilter,
                        pagination: this.syncedPagination
                    })
                    this.restoreFocus()
                }
            }
        },
        restoreFocus () {
            if (this.restoreFocusTo) {
                this.$nextTick(() => {
                    // NOTE: as a temporary workaround, use "key" for the elements in Portal otherwise you may not
                    //       see those elements in "$refs" collection. For more details check this issue:
                    //       https://github.com/LinusBorg/portal-vue/issues/294
                    const focusElement = this.$refs[this.restoreFocusTo]
                    this.restoreFocusTo = ''
                    if (focusElement) {
                        focusElement.focus()
                    }
                })
            }
        },
        async requestEvent (props) {
            this.syncedPagination = props.pagination
        },
        async patchField (field, value, props) {
            const colId = this.waitIdentifier + '-row-' + props.row[this.rowKey] + '-col-' + props.col.name
            let resource = this.resource
            if (this.rowResource) {
                resource = this.rowResource(props.row)
            }
            this.$wait.start(this.waitIdentifier)
            this.$wait.start(colId)
            try {
                await this.patchResource({
                    tableId: this.tableId,
                    resource: resource,
                    resourceId: props.row[this.rowKey],
                    resourceField: field,
                    resourceValue: value,
                    resourceDefaultFilters: this.getUpdateFilters({
                        row: props.row
                    })
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
                this.$wait.end(colId)
                await this.refresh()
            }
        },
        confirmRowDeletion (row) {
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                parent: this,
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
            }).onOk(async () => {
                if (this.deletionExtraConfirm) {
                    await this.extraConfirmRowDeletion(row)
                } else {
                    await this.deleteRow(row)
                }
            })
        },
        async extraConfirmRowDeletion (row) {
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
                        parent: this,
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
                    }).onOk(async () => {
                        await this.deleteRow(row)
                    })
                } else {
                    await this.deleteRow(row)
                }
            } finally {
                this.$wait.end(this.waitIdentifier)
            }
        },
        async deleteRow (row) {
            let resource = this.resource
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
                    tableId: this.tableId,
                    resource: resource,
                    resourceAlt: this.resourceAlt,
                    resourceBasePath: this.resourceBasePath,
                    resourceId: row[this.rowKey],
                    resourceDefaultFilters: this.getDeletionFilters({ row })
                })
            } catch (error) {
                showGlobalErrorMessage(error)
                markErrorAsHandled(error)
            } finally {
                this.$wait.end(this.waitIdentifier)
                await this.refresh()
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
            const route = { name: routeName, params: { id: row[this.rowKey] } }
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
        rowMenuRouteObjects (row) {
            if (row) {
                return this.rowMenuRouteNames
                    .map(routeName => this.rowMenuRoute(routeName, row))
                    .filter(routeObject => this.$routeMeta.$aclCan(routeObject))
            }
            return []
        },
        rowMenuItems (row) {
            return this.rowMenuRouteObjects(row).map(route => {
                return {
                    label: this.$routeMeta.$label(route),
                    icon: this.$routeMeta.$icon(route),
                    to: route
                }
            })
        },
        hasMenuItems (row) {
            return !_.isEmpty(this.$slots['row-more-menu']) ||
                !_.isEmpty(this.rowMenuItems(row)) ||
                this.isEditBtnVisible(row) ||
                this.isTerminateBtnVisible(row)
        },
        isEditBtnVisible (row) {
            return !!row && !!this.resourceEditPath(row) && this.editable && this.isRowEditable(row) === true
        },
        isTerminateBtnVisible (row) {
            return !!row && this.deletable && this.isRowDeletable(row) === true
        },
        hasEditRowMenuRoute (row) {
            const resourceEditPath = this.resourceEditPath(row)
            if (row && resourceEditPath) {
                const editRouteData = this.$router.resolve(this.resourceEditPath(row))
                return this.rowMenuRouteObjects(row).some((routeObject) => {
                    const routeData = this.$router.resolve(routeObject)
                    return routeData?.route?.name === editRouteData?.route?.name
                })
            }
            return false
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
            const expand = new Set()
            this.columns.forEach((column) => {
                if (column.expand) {
                    expand.add(column.expand)
                }
            })
            if (expand.size > 0) {
                filters.expand = Array.from(expand).join(',')
            }
            return filters
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
        saveFilterAndPagination ({ filter, pagination } = {}) {
            storeDataTableOptions({
                routeName: this.$route.name,
                resource: this.resource,
                filter: filter || this.syncedFilter,
                pagination: pagination || this.syncedPagination
            })
        },
        loadFilterAndPagination () {
            const dataTableOptions = getDataTableOptions({
                routeName: this.$route.name,
                resource: this.resource
            })
            this.syncedPagination = _.get(dataTableOptions, 'pagination', this.getDefaultPagination())
            this.syncedFilter = _.get(dataTableOptions, 'filter', this.getDefaultFilter())
        },
        getDefaultPagination () {
            return {
                sortBy: null,
                page: 1,
                descending: false,
                rowsPerPage: 10
            }
        },
        getDefaultFilter () {
            return ''
        }
    }
}
</script>
