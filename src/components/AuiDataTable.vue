<template>
	<div
		class="aui-data-table"
	>
		<q-table
			ref="table"
			:row-key="rowKey"
			flat
			dense
			:title="title"
			:selection="$wait.is('aui-data-table-' + tableId)?'none':'single'"
			:loading="$wait.is('aui-data-table-' + tableId)"
			:columns="internalColumns"
			:data="rows"
			:fullscreen="fullscreen"
			:pagination.sync="internalPagination"
			:selected.sync="selectedRows"
			@request="request"
		>
			<template
				v-slot:top-right
			>
				<aui-input-search
					v-model="filter"
					:disable="!searchable"
				/>
				<aui-more-menu
					class="q-ml-sm"
				>
					<slot
						v-slot:menu-prepend
					/>
					<aui-popup-menu-item
						icon="refresh"
						:label="$t('Refresh')"
						@click="triggerReload"
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
						v-if="props.col.editable === true"
					>
						<q-toggle
							v-if="props.col.component === 'toggle'"
							:value="$toBoolean(props.value)"
							:disable="$wait.is('aui-data-table-' + tableId)"
							@input="patchCell($event, props)"
						/>
						<q-checkbox
							v-else-if="props.col.component === 'checkbox'"
							:value="$toBoolean(props.value)"
							:disable="$wait.is('aui-data-table-' + tableId)"
							@input="patchCell($event, props)"
						/>
						<template
							v-else-if="props.col.component === 'input'"
						>
							<span
								class="cursor-pointer"
							>
								{{ props.value }}
								<q-popup-edit
									v-model="popupEdit"
									buttons
									:label-set="$t('Save')"
									@save="patchCell(props)"
									@before-show="popupEdit=props.value"
								>
									<q-input
										v-model="popupEdit"
										dense
										autofocus
										:label="props.col.label"
									/>
								</q-popup-edit>
							</span>
						</template>
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
							/>
							<aui-popup-menu-item
								v-if="deletable"
								:icon="deletionIcon"
								:label="deletionLabel"
								color="negative"
								@click="rowDeleteConfirm(props)"
							/>
						</aui-more-menu>
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

export default {
	name: 'AuiDataTable',
	components: {
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
		resourceType: {
			type: String,
			default: 'api'
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
			default: true
		},
		deletionIcon: {
			type: String,
			default: 'delete'
		},
		deletionLabel: {
			type: String,
			default: i18n.t('Delete')
		},
		deletionTitle: {
			type: String,
			default: i18n.t('Delete row')
		},
		deletionTextI18nKey: {
			type: String,
			default: i18n.t('You are about to delete row {id}')
		},
		deletionSubject: {
			type: String,
			default: 'id'
		}
	},
	data () {
		return {
			internalPagination: {
				rowsNumber: 0
			},
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
			const filter = this.$store.state.dataTable[this.tableId + 'Filter']
			if (filter === undefined) {
				return ''
			}
			return filter
		},
		rows () {
			return this.$store.state.dataTable[this.tableId + 'Rows']
		},
		internalColumns () {
			const internalColumns = _.cloneDeep(this.columns)
			internalColumns.push({
				name: 'menu',
				label: '',
				field: 'menu',
				align: 'right'
			})
			return internalColumns
		},
		pureColumns () {
			const pureColumns = []
			this.columns.forEach((column) => {
				pureColumns.push(column.field)
			})
			return pureColumns
		}
	},
	watch: {
		pagination (pagination) {
			this.internalPagination = pagination
		},
		rows () {
			this.$wait.end('aui-data-table-' + this.tableId)
		},
		selectedRows () {
			this.$emit('rows-selected', this.selectedRows)
		}
	},
	mounted () {
		this.triggerReload()
	},
	methods: {
		request ($event) {
			this.$wait.start('aui-data-table-' + this.tableId)
			this.$store.dispatch('dataTable/request', {
				tableId: this.tableId,
				resource: this.resource,
				resourceType: this.resourceType,
				pagination: $event.pagination,
				filter: this.filter,
				columns: this.pureColumns
			})
		},
		triggerReload (keepTableState) {
			this.selectedRows = []
			this.$emit('rows-selected', this.selectedRows)
			let pagination = {
				sortBy: '',
				descending: false,
				page: 1,
				rowsPerPage: 10
			}
			let filter = ''
			if (keepTableState) {
				pagination = this.pagination
				filter = this.filter
			}
			this.$refs.table.requestServerInteraction({
				pagination: pagination,
				filter: filter
			})
		},
		patchCell (value, props) {
			this.$wait.start('aui-data-table-' + this.tableId)
			this.$store.dispatch('dataTable/patch', {
				tableId: this.tableId,
				resource: this.resource,
				resourceId: props.row.id,
				resourceField: props.col.field,
				resourceValue: value
			})
		},
		rowDeleteConfirm (props) {
			this.$q.dialog({
				component: NegativeConfirmationDialog,
				parent: this,
				title: this.deletionTitle,
				icon: this.deletionIcon,
				text: this.$t(this.deletionTextI18nKey, {
					[this.deletionSubject]: props.row[this.deletionSubject]
				}),
				buttonIcon: this.deletionIcon,
				buttonLabel: this.deletionLabel
			}).onOk(() => {
				this.rowDelete(props)
			})
		},
		rowDelete (props) {
			this.$wait.start('aui-data-table-' + this.tableId)
			this.$store.dispatch('dataTable/deleteResource', {
				tableId: this.tableId,
				resource: this.resource,
				resourceId: props.row.id
			}).finally(() => {
				this.triggerReload(true)
			})
		}
	}
}
</script>
