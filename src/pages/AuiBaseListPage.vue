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
                    v-if="rowActionRoutes && rowActionRoutes.length > 0 && $aclCan('update', aclResource)"
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
            <!--                <aui-dropdown-button-->
            <!--                    v-if="addButtonRoutes && addButtonRoutes.length > 1 && $aclCan('create', aclResource)"-->
            <!--                    class="q-mr-sm"-->
            <!--                    icon="add"-->
            <!--                    :label="$t('Add')"-->
            <!--                    :disable-main-btn="$attrs.loading || tableLoading"-->
            <!--                    :disable-dropdown="$attrs.loading || tableLoading"-->
            <!--                    :split="addButtonSplit"-->
            <!--                    :routes="addButtonRoutes"-->
            <!--                    :to="(addButtonSplit) ? addButtonRoutes[0] : undefined"-->
            <!--                />-->
            <!--                <aui-add-button-->
            <!--                    v-else-if="addButtonRoutes && addButtonRoutes.length === 1 && $routeMeta.$aclCan(addButtonRoutes[0])"-->
            <!--                    class="q-mr-sm"-->
            <!--                    :disabled="$attrs.loading || tableLoading"-->
            <!--                    :to="addButtonRoutes[0]"-->
            <!--                />-->
            <!--                <aui-dropdown-button-->
            <!--                    v-if="editButtonRoutes && editButtonRoutes.length > 1 && $aclCan('update', aclResource)"-->
            <!--                    class="q-mr-sm"-->
            <!--                    icon="edit"-->
            <!--                    :label="$t('Edit')"-->
            <!--                    :disable-main-btn="$attrs.loading || !rowsSelected || tableLoading"-->
            <!--                    :disable-dropdown="$attrs.loading || !rowsSelected || tableLoading"-->
            <!--                    :split="editButtonSplit"-->
            <!--                    :routes="editButtonRoutes"-->
            <!--                    :to="(editButtonSplit) ? editButtonRoutes[0] : undefined"-->
            <!--                />-->
            <!--                <aui-edit-button-->
            <!--                    v-else-if="editButtonRoutes && editButtonRoutes.length === 1 && $routeMeta.$aclCan(editButtonRoutes[0])"-->
            <!--                    class="q-mr-sm"-->
            <!--                    :disabled="(selectedRow && !selectedRow.editable) || $attrs.loading || !rowsSelected || tableLoading"-->
            <!--                    :to="editButtonRoutes[0]"-->
            <!--                />-->
            <!--                <aui-delete-button-->
            <!--                    v-if="deleteButton && $aclCan('delete', aclResource)"-->
            <!--                    class="q-mr-sm"-->
            <!--                    :label="deleteButtonLabel"-->
            <!--                    :disabled="(selectedRow && !selectedRow.deletable) || $attrs.loading || !rowsSelected || tableLoading"-->
            <!--                    @click="deleteSelectedRow"-->
            <!--                />-->
            </div>
        </template>
        <template
            v-slot:toolbar-right
        >
            <aui-input-search
                v-model="search"
                class="q-mr-sm"
                dense
                borderless
                clearable
                :disabled="$attrs.loading || tableLoading"
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
import { mapActions } from 'vuex'
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
            const routes = []
            this.rowActionRouteNames.forEach((routeName) => {
                routes.push(this.rowActionRouteIntercept({
                    route: {
                        name: routeName,
                        params: {
                            id: this.selectedResourceId || '#'
                        }
                    },
                    row: this.selectedRow?.data,
                    dataTableRow: this.selectedRow
                }))
            })
            return routes
        },
        tableLoading () {
            return this.$wait.is('aui-data-table-*')
        }
    },
    async mounted () {
        const dataTable = this.getDataTable()
        if (dataTable) {
            const storedPagination = await this.getDataTableOption({
                routeName: this.$route.name,
                resource: dataTable.resource
            })
            if (storedPagination?.filter) {
                this.search = storedPagination.filter
            }
            dataTable.$on('rows-selected', (selectedRows) => {
                this.selectedRows = selectedRows
            })
            dataTable.$on('row-selected', (row) => {
                this.selectedRow = row
            })
        }
    },
    methods: {
        ...mapActions('dataTable', [
            'getDataTableOption'
        ]),
        getDataTable () {
            if (this.$slots.default && this.$slots.default[0]) {
                const firstComponent = this.$slots.default[0].componentInstance
                const firstComponentName = firstComponent.$options.name
                if (firstComponentName === 'AuiDataTable') {
                    return firstComponent
                }
            }
            return null
        },
        deleteSelectedRow () {
            const dataTable = this.getDataTable()
            if (dataTable && this.selectedRows && this.selectedRows.length > 0) {
                dataTable.confirmRowDeletion(this.selectedRows[0])
            }
        },
        triggerSearch (value) {
            const dataTable = this.getDataTable()
            if (dataTable) {
                dataTable.triggerFilter(value || '')
            }
        },
        refresh () {
            const dataTable = this.getDataTable()
            if (dataTable) {
                dataTable.triggerReload({
                    tableFilter: this.search,
                    keepPagination: true
                })
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
