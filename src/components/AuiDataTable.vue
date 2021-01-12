<template>
	<div
		class="aui-data-table"
	>
		<div
			v-if="!fullscreen"
			class="text-h6 text-weight-light q-pl-lg q-pr-lg"
		>
			{{ title }}
		</div>
		<q-table
			ref="table"
			:row-key="rowKey"
			flat
			dense
			:title="title"
			selection="single"
			:loading="$wait.is('aui-data-table-' + tableId)"
			:columns="internalColumns"
			:data="rows"
			:fullscreen="fullscreen"
			:pagination.sync="internalPagination"
			:filter="internalFilter"
			:selected.sync="selectedRows"
			@request="request"
		>
			<template
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
					:selected="selectedRows.length === 0"
					:row="selectedRows[0] || {}"
					:loading="$wait.is('aui-data-table-' + tableId)"
				/>
				<q-btn
					v-if="addable"
					class="q-mr-xs"
					icon="add"
					unelevated
					size="md"
					color="primary"
					:disable="$wait.is('aui-data-table-' + tableId)"
					:label="$t('Add')"
					:to="resourceBasePath + '/create'"
				/>
				<q-btn
					v-if="editable"
					class="q-mr-xs"
					icon="edit"
					:label="$t('Edit')"
					unelevated
					size="md"
					color="primary"
					:disable="selectedRows.length === 0 ||
						$wait.is('aui-data-table-' + tableId) ||
						(selectedRows.length > 0 && !rowEditable(selectedRows[0]))"
					:to="editUrl"
				/>
				<q-btn
					v-if="deletable"
					class="q-mr-xs"
					:icon="deletionIcon"
					:label="deletionLabel"
					unelevated
					size="md"
					color="negative"
					:disable="selectedRows.length === 0 ||
						$wait.is('aui-data-table-' + tableId) ||
						(selectedRows.length > 0 && !rowDeletable(selectedRows[0]))"
					@click="confirmRowDeletion(selectedRows[0])"
				/>
			</template>
			<template
				v-slot:top-right
			>
				<aui-input-search
					:value="filter"
					:disable="!searchable || $wait.is('aui-data-table-' + tableId)"
					@input="triggerFilter($event)"
				/>
				<aui-more-menu
					class="q-ml-sm"
					:disable="$wait.is('aui-data-table-' + tableId)"
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
							:disable="$wait.is('aui-data-table-' + tableId)"
							:icon="props.col.icon"
							@input="patchField(props.col.name, $event, props)"
						/>
						<q-checkbox
							v-else-if="props.col.component === 'checkbox'"
							:value="$toBoolean(props.value)"
							:disable="$wait.is('aui-data-table-' + tableId)"
							@input="patchField(props.col.name, $event, props)"
						/>
						<aui-data-table-edit-input
							v-else-if="props.col.component === 'input'"
							:column="props.col"
							:row="props.row"
							:value="props.value"
							@save="patchField($event.column.name, $event.value, props)"
						/>
						<aui-data-table-edit-select
							v-else-if="props.col.component === 'select'"
							:column="props.col"
							:row="props.row"
							:value="props.value"
							@save="patchField($event.column.name, $event.value, props)"
						/>
						<aui-data-table-edit-select-lazy
							v-else-if="props.col.component === 'select-lazy'"
							:column="props.col"
							:row="props.row"
							:value="props.value"
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
							<aui-popup-menu-item
								v-if="editable && rowEditable(props.row) === true"
								icon="edit"
								:label="$t('Edit')"
								color="primary"
								:to="'/' + resourceBasePath + '/' + props.row[rowKey] + '/edit'"
							/>
							<aui-popup-menu-item
								v-if="deletable && rowDeletable(props.row) === true"
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
	mapActions
} from 'vuex'

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
			required: true
		},
		resource: {
			type: String,
			required: true
		},
		rowResource: {
			type: Function,
			default: undefined
		},
		resourceBasePath: {
			type: String,
			required: true
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
			default: (row) => {
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
			default: (row) => {
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
		local: {
			type: Boolean,
			default: false
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
					if (availableColumns.has(column.field)) {
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
		editUrl () {
			if (this.selectedRows.length > 0) {
				return '/' + this.resourceBasePath + '/' + this.selectedRows[0][this.rowKey] + '/edit'
			}
			return ''
		},
		patchError () {
			return this.$store.state.dataTable[this.tableId + 'PatchError']
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
			this.$wait.end('aui-data-table-' + this.tableId)
		},
		selectedRows () {
			this.$emit('rows-selected', this.selectedRows)
		},
		patchError (error) {
			if (error) {
				this.$q.notify({
					position: 'top',
					color: 'negative',
					message: error
				})
			}
		}
	},
	mounted () {
		this.triggerReload({
			keepPagination: false
		})
	},
	methods: {
		...mapActions('dataTable', [
			'patchResource'
		]),
		request ($event) {
			let filter = ''
			this.internalFilter = ''
			if (_.has($event, 'tableFilter')) {
				filter = _.get($event, 'tableFilter', '')
			} else {
				filter = this.filter
			}
			this.$wait.start('aui-data-table-' + this.tableId)
			this.$store.dispatch('dataTable/request', {
				tableId: this.tableId,
				resource: this.resource,
				resourceType: this.resourceType,
				resourceAlt: this.resourceAlt,
				pagination: $event.pagination,
				filter: filter,
				columns: this.pureColumns
			})
		},
		triggerReload (options = { keepPagination: false }) {
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
			this.request({
				pagination: pagination,
				tableFilter: _.get(options, 'tableFilter', '')
			})
		},
		triggerFilter ($event) {
			if (this.local === true) {
				this.internalFilter = $event
			} else {
				this.triggerReload({ keepPagination: false, tableFilter: $event })
			}
		},
		async patchField (field, value, props) {
			const tableId = 'aui-data-table-' + this.tableId
			const colId = 'aui-data-table-' + this.tableId + '-row-' + props.row[this.rowKey] + '-col-' + props.col.name
			this.$wait.start(tableId)
			this.$wait.start(colId)
			let resource = this.resource
			if (this.rowResource) {
				resource = this.rowResource(props.row)
			}
			await this.patchResource({
				tableId: this.tableId,
				resource: resource,
				resourceId: props.row[this.rowKey],
				resourceField: field,
				resourceValue: value
			})
			await this.triggerReload({ keepPagination: true })
			this.$wait.end(tableId)
			this.$wait.end(colId)
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
		deleteRow (row) {
			this.$wait.start('aui-data-table-' + this.tableId)
			let resource = this.resource
			if (this.rowResource) {
				resource = this.rowResource(row)
			}
			this.$store.dispatch('dataTable/deleteResource', {
				tableId: this.tableId,
				resource: resource,
				resourceId: row[this.rowKey]
			}).finally(() => {
				this.triggerReload({ keepPagination: true })
			})
		}
	}
}
</script>
