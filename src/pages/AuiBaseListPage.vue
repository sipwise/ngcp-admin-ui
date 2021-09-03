<template>
    <aui-base-page
        class="aui-base-list-page"
        :loading="$attrs.loading || tableLoading"
        :dense="$attrs.dense"
        v-bind="$attrs"
        v-on="$listeners"
        @refresh="refresh"
    >
        <template
            v-slot:toolbar-left
        >
            <div
                class="q-ml-xl row"
            >
                <aui-list-action
                    v-if="addButtonRoutes && addButtonRoutes.length > 0 && $aclCan('create', aclResource)"
                    :label="$t('Add')"
                    icon="add"
                    :split="addButtonSplit"
                    :routes="addButtonRoutes"
                    :disable="$attrs.loading || tableLoading"
                />
                <aui-list-action
                    v-if="rowActionRoutes && rowActionRoutes.length > 0"
                    class="q-ml-sm"
                    :label="$routeMeta.$label(rowActionRoutes[0])"
                    :icon="$routeMeta.$icon(rowActionRoutes[0])"
                    :split="rowActionSplit"
                    :routes="rowActionRoutes"
                    :disable="!selectedResourceId || $attrs.loading || tableLoading"
                />
                <aui-list-action
                    v-if="deleteButton && $aclCan('delete', aclResource)"
                    class="q-ml-sm"
                    :label="(deleteButtonLabel) ? deleteButtonLabel : $t('Delete')"
                    icon="delete"
                    color="negative"
                    :disable="!selectedResourceId || $attrs.loading || tableLoading"
                    @click="deleteSelectedRow"
                />
            </div>
        </template>
        <template
            v-slot:toolbar-right
        >
            <aui-input-search
                ref="inputSearch"
                v-model="search"
                class="q-mr-sm"
                dense
                borderless
                :readonly="!isDataTableAvailable"
                :disable="$attrs.loading || tableLoading || !isDataTableAvailable"
                @input="triggerSearch(search)"
            />
        </template>
        <slot />
    </aui-base-page>
</template>
<script>
import AuiInputSearch from 'components/input/AuiInputSearch'
import AuiBasePage from 'pages/AuiBasePage'
import AuiListAction from 'components/AuiListAction'
export default {
    name: 'AuiBaseListPage',
    components: {
        AuiListAction,
        AuiBasePage,
        AuiInputSearch
    },
    props: {
        aclResource: {
            type: String,
            required: true
        },
        addButtonRoutes: {
            type: Array,
            default () {
                return []
            }
        },
        addButtonSplit: {
            type: Boolean,
            default: true
        },
        rowActionRouteNames: {
            type: Array,
            default () {
                return []
            }
        },
        rowActionRouteIntercept: {
            type: Function,
            default ({ route }) {
                return route
            }
        },
        rowActionSplit: {
            type: Boolean,
            default: true
        },
        deleteButton: {
            type: Boolean,
            default: true
        },
        deleteButtonLabel: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            dataTable: undefined,
            search: '',
            selectedRows: [],
            selectedRow: null
        }
    },
    computed: {
        rowsSelected () {
            return this.selectedRows && this.selectedRows.length > 0
        },
        selectedResourceId () {
            if (this.rowsSelected) {
                return this.selectedRows[0].id
            }
            return null
        },
        rowActionRoutes () {
            return this.rowActionRouteNames
                .map(routeName =>
                    this.rowActionRouteIntercept({
                        route: {
                            name: routeName,
                            params: {
                                id: this.selectedResourceId || '#'
                            }
                        },
                        row: this.selectedRow?.data,
                        dataTableRow: this.selectedRow
                    })
                )
                .filter(route => this.$routeMeta.$aclCan(route))
        },
        tableLoading () {
            return this.isDataTableAvailable && this.dataTable.tableLoading
        },
        isDataTableAvailable () {
            return !!this.dataTable
        },
        filter () {
            return this.isDataTableAvailable ? this.dataTable.filter : ''
        }
    },
    watch: {
        filter (value) {
            this.search = value
        }
    },
    mounted () {
        const dataTable = this.getDataTable()
        if (dataTable) {
            this.dataTable = dataTable
            dataTable.$on('rows-selected', (selectedRows) => {
                this.selectedRows = selectedRows
            })
            dataTable.$on('row-selected', (row) => {
                this.selectedRow = row
            })
        } else {
            const componentName = this?.$options?.name
            console.warn(componentName + ': Cannot find "aui-data-table" component. It should be te first element in the default slot')
        }
    },
    methods: {
        getDataTable () {
            if (this.$slots.default && this.$slots.default[0]) {
                const firstComponent = this.$slots.default[0].componentInstance
                const firstComponentName = firstComponent?.$options?.name
                if (firstComponentName === 'AuiDataTable') {
                    return firstComponent
                }
            }
            return null
        },
        deleteSelectedRow () {
            if (this.dataTable && this.selectedRows && this.selectedRows.length > 0) {
                this.dataTable.confirmRowDeletion(this.selectedRows[0])
            }
        },
        async triggerSearch (value) {
            if (this.dataTable) {
                await this.dataTable.refresh({
                    filter: value || ''
                })
                this.$refs.inputSearch.focus()
            }
        },
        refresh () {
            if (this.dataTable) {
                this.dataTable.refresh()
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'
.aui-base-list-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
