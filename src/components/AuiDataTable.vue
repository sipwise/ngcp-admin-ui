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
            :pagination.sync="internalPagination"
            :filter="internalFilter"
            :selected.sync="selectedRows"
            :rows-per-page-options="[5, 10, 50, 100, 250, 0]"
            @request="request"
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
                    :label="deletionLabel"
                    unelevated
                    size="md"
                    color="negative"
                    :disable="!hasRowSelected || (hasRowSelected && !isRowDeletable(selectedRow)) || tableLoading"
                    @click="confirmRowDeletion(selectedRow)"
                />
            </template>
            <template
                v-if="showHeader"
                v-slot:top-right
            >
                <aui-input-search
                    :value="filter"
                    :disable="!searchable || tableLoading"
                    dense
                    @input="triggerFilter($event)"
                />
                <aui-more-menu
                    class="q-ml-sm"
                    :disable="tableLoading"
                >
                    <slot
                        v-slot:menu-prepend
                    />
                    <aui-popup-menu-item
                        icon="refresh"
                        :label="$t('Refresh')"
                        @click="triggerReload({ keepPagination: true })"
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
                    class="ellipsis"
                    :props="props"
                >
                    <template
                        v-if="props.col.component && (props.col.editable === true ||
                            (typeof(props.col.editable) === 'function' && props.col.editable(props) === true))"
                    >
                        <q-toggle
                            v-if="props.col.component === 'toggle'"
                            :value="$toBoolean(props.value)"
                            :disable="isColumnDisabled(props)"
                            :icon="props.col.icon"
                            @input="patchField(props.col.name, $event, props)"
                        />
                        <q-checkbox
                            v-else-if="props.col.component === 'checkbox'"
                            :value="$toBoolean(props.value)"
                            :disable="isColumnDisabled(props)"
                            @input="patchField(props.col.name, $event, props)"
                        />
                        <aui-data-table-edit-input
                            v-else-if="props.col.component === 'input'"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            @save="patchField($event.column.name, $event.value, props)"
                        />
                        <aui-data-table-edit-select
                            v-else-if="props.col.component === 'select'"
                            :column="props.col"
                            :row="props.row"
                            :value="props.value"
                            :disable="isColumnDisabled(props)"
                            @save="patchField($event.column.name, $event.value, props)"
                        />
                        <aui-data-table-edit-select-lazy
                            v-else-if="props.col.component === 'select-lazy'"
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
                        v-else-if="props.col.name === 'menu'"
                    >
                        <aui-more-menu>
                            <slot
                                name="row-more-menu"
                                :value="props.value"
                                :col="props.col"
                                :row="props.row"
                            />
                            <template
                                v-for="(rowMenuRouteName, rowMenuRouteNameIndex) in rowMenuRouteNames"
                            >
                                <aui-popup-menu-item
                                    v-if="rowMenuAclCan(rowMenuRouteName, props.row)"
                                    :key="rowMenuRouteNameIndex"
                                    :icon="rowMenuIcon(rowMenuRouteName, props.row)"
                                    :label="rowMenuLabel(rowMenuRouteName, props.row)"
                                    :to="rowMenuRoute(rowMenuRouteName, props.row)"
                                    color="primary"
                                />
                            </template>
                            <aui-popup-menu-item
                                v-if="resourceEditPath(props.row) && editable && isRowEditable(props.row) === true"
                                icon="edit"
                                color="primary"
                                :label="$t('Edit')"
                                :to="resourceEditPath(props.row)"
                            />
                            <aui-popup-menu-item
                                v-if="isRowDeletable(props.row) === true"
                                :icon="deletionIcon"
                                :label="deletionLabel"
                                color="negative"
                                @click="confirmRowDeletion(props.row)"
                            />
                        </aui-more-menu>
                    </template>
                    <template
                        v-else-if="props.value === '' || props.value === undefined || props.value === null"
                    >
                        {{ $t('N/A') }}
                    </template>
                    <template
                        v-else
                    >
                        {{ props.value }}
                    </template>
                </q-td>
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
import {
    i18n
} from 'boot/i18n'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
import AuiDataTableEditSelect from 'components/AuiDataTableEditSelect'
import AuiDataTableEditInput from 'components/AuiDataTableEditInput'
import AuiDataTableEditSelectLazy from 'components/AuiDataTableEditSelectLazy'
import {
    mapActions, mapState
} from 'vuex'
import { showGlobalErrorMessage } from 'src/helpers/ui'

export default {
    name: 'AuiDataTable',
    components: {
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
        resourceSearchField: {
            type: String,
            default: undefined
        },
        resourceDefaultFilters: {
            type: Object,
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
        resourcePlural: {
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
                return true
            }
        },
        addable: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: false
        },
        rowEditable: {
            type: Function,
            default () {
                return true
            }
        },
        deletionIcon: {
            type: String,
            default: 'delete'
        },
        deletionLabel: {
            type: String,
            default: i18n.t('Delete')
        },
        deletionTitleI18nKey: {
            type: String,
            default: 'Delete {resource}'
        },
        deletionTextI18nKey: {
            type: String,
            default: 'You are about to delete {resource} {subject}'
        },
        deletionSubject: {
            type: String,
            default: 'id'
        },
        deletionAction: {
            type: String,
            default: undefined
        },
        local: {
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
        }
    },
    data () {
        let internalPagination = {
            rowsNumber: 0
        }
        if (this.local === true) {
            internalPagination = {}
        }
        return {
            internalPagination: internalPagination,
            internalFilter: '',
            selectedRows: [],
            fullscreen: false,
            popupEdit: ''
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
            return this.$wait.is(this.waitIdentifier)
        },
        pagination () {
            return this.$store.state.dataTable[this.tableId + 'Pagination']
        },
        filter () {
            if (this.local === true) {
                return this.internalFilter
            } else {
                const filter = this.$store.state.dataTable[this.tableId + 'Filter']
                if (filter === undefined) {
                    return ''
                }
                return filter
            }
        },
        rows () {
            return this.$store.state.dataTable[this.tableId + 'Rows']
        },
        internalColumns () {
            const internalColumns = _.cloneDeep(this.columns)
            let finalColumns = []
            const availableColumns = new Set()
            if (this.rows && this.rows.length > 0) {
                this.rows.forEach((row) => {
                    Object.keys(row).forEach((column) => {
                        availableColumns.add(column)
                    })
                })
                internalColumns.forEach((column) => {
                    const aclResource = 'entity.' + this.resource + '.columns.' + column.field
                    if (availableColumns.has(column.field) && this.$aclCan('read', aclResource)) {
                        finalColumns.push(column)
                    }
                })
            } else {
                finalColumns = internalColumns
            }
            finalColumns.push({
                name: 'menu',
                label: '',
                field: 'menu',
                align: 'right'
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
        }
    },
    watch: {
        pagination (pagination) {
            const updatedPagination = _.clone(pagination)
            if (this.local === true) {
                delete updatedPagination.rowsNumber
            }
            this.internalPagination = updatedPagination
        },
        rows () {
            this.$wait.end(this.waitIdentifier)
        },
        selectedRows () {
            this.$emit('rows-selected', this.selectedRows)
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
        await this.triggerReload({
            keepPagination: false
        })
    },
    methods: {
        ...mapActions('dataTable', [
            'patchResource'
        ]),
        async request ($event) {
            let filter = ''
            this.internalFilter = ''
            if (_.has($event, 'tableFilter')) {
                filter = _.get($event, 'tableFilter', '')
            } else {
                filter = this.filter
            }
            this.$wait.start(this.waitIdentifier)
            try {
                await this.$store.dispatch('dataTable/request', {
                    tableId: this.tableId,
                    resource: this.resource,
                    resourceType: this.resourceType,
                    resourceAlt: this.resourceAlt,
                    resourceSearchField: this.resourceSearchField,
                    resourceDefaultFilters: this.resourceDefaultFilters,
                    pagination: $event.pagination,
                    filter: filter,
                    columns: this.pureColumns
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
            }
        },
        async triggerReload (options = { keepPagination: false, tableFilter: '' }) {
            this.selectedRows = []
            this.$emit('rows-selected', this.selectedRows)
            let pagination = {
                sortBy: '',
                descending: false,
                page: 1,
                rowsPerPage: 10
            }
            if (options.keepPagination) {
                pagination = this.pagination
            }
            await this.request({
                pagination: pagination,
                tableFilter: _.get(options, 'tableFilter', options.tableFilter)
            })
        },
        async triggerFilter ($event) {
            if (this.local === true) {
                this.internalFilter = $event
            } else {
                await this.triggerReload({ keepPagination: false, tableFilter: $event })
            }
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
                    resourceValue: value
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
                this.$wait.end(colId)
                await this.triggerReload({
                    keepPagination: true,
                    tableFilter: this.filter
                })
            }
        },
        confirmRowDeletion (row) {
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                parent: this,
                title: this.$t(this.deletionTitleI18nKey, {
                    resource: this.resourceSingular
                }),
                icon: this.deletionIcon,
                text: this.$t(this.deletionTextI18nKey, {
                    resource: this.resourceSingular,
                    subject: row[this.deletionSubject]
                }),
                buttonIcon: this.deletionIcon,
                buttonLabel: this.deletionLabel
            }).onOk(() => {
                this.deleteRow(row)
            })
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
                    resourceId: row[this.rowKey]
                })
            } finally {
                this.$wait.end(this.waitIdentifier)
                await this.triggerReload({ keepPagination: true })
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
        rowMenuLabel (routeName, row) {
            return this.$routeMeta.$label(this.rowMenuRoute(routeName, row))
        },
        rowMenuIcon (routeName, row) {
            return this.$routeMeta.$icon(this.rowMenuRoute(routeName, row))
        },
        rowMenuAclCan (routeName, row) {
            return this.$routeMeta.$aclCan(this.rowMenuRoute(routeName, row))
        },
        resourceEditPath (row) {
            if (this.resourceBasePath && row) {
                return '/' + this.resourceBasePath + '/' + row[this.rowKey] + '/edit'
            } else {
                return null
            }
        }
    }
}
</script>
