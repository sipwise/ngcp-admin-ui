<template>
	<q-page
		class="q-pa-lg"
	>
		<slot
			name="dialogs"
			:admin="selectedRows[0]"
		/>
		<negative-confirmation-dialog
			v-if="selectedRows.length > 0"
			v-model="confirmDeletion"
			icon="delete"
			button-icon="delete"
			:title="$t('Delete {entity}', { entity: entitySingular })"
			:text="$t('You are about to delete {entity} {name}', { entity: entitySingular, name: selectedRows[0].login })"
			:button-label="$t('Delete')"
			@confirmed="deleteEntity"
		/>
		<q-table
			ref="dataTable"
			table-class="ap-generic-data-table"
			row-key="id"
			flat
			dense
			:loading="isTableLoading"
			:columns="columns"
			:data="entities"
			:fullscreen="tableFullscreen"
			:pagination.sync="paginationObject"
			selection="single"
			:selected.sync="selectedRows"
			@request="request"
			@row-click="rowClick"
		>
			<template
				v-slot:top-left
			>
				<q-btn
					class="q-mr-sm"
					:icon="addIcon"
					unelevated
					size="md"
					color="primary"
					:disable="isTableLoading"
					:label="$t('Add {entity}', { entity: entitySingular })"
					:to="'/' + entitySingular + '/create'"
				/>
				<q-btn
					class="q-mr-sm"
					icon="edit"
					:label="$t('Edit')"
					unelevated
					color="primary"
					:disable="selectedRows.length === 0"
					:to="editButtonUrl"
				/>
				<delete-button
					class="q-mr-sm"
					:disable="selectedRows.length === 0"
					@delete="confirmDeletion = true"
				/>
			</template>
			<template
				v-slot:top-right
			>
				<q-input
					:value="filter"
					:loading="isTableLoading"
					class="q-mr-md"
					debounce="1000"
					filled
					square
					dense
					:placeholder="$t('Search')"
					@input="inputSearch"
				>
					<template
						v-slot:prepend
					>
						<q-icon
							name="search"
						/>
					</template>
				</q-input>
				<q-icon
					class="cursor-pointer"
					:name="fullscreenIcon"
					color="primary"
					size="sm"
					@click="toggleFullscreen"
				/>
			</template>
			<template
				v-slot:body-cell="props"
			>
				<q-td
					class="ellipsis"
					:props="props"
				>
					<q-toggle
						v-if="props.col.component === 'toggle'"
						:value="$toBoolean(props.value)"
						:icon="props.col.toggleIcon"
						@input="toggleCell($event, props)"
					/>
					<slot
						v-else-if="props.col.component === 'component-' + props.col.name"
						:name="'component-' + props.col.name"
						:value="props.value"
						:col="props.col"
						:row="props.row"
					/>
					<template
						v-else-if="props.col.component === 'input'"
					>
						{{ props.value }}
						<q-popup-edit
							v-model="popupEdit"
							:title="props.col.label"
							buttons
							label-set="Save"
							@save="saveCell(props)"
							@before-show="popupEditShow(props)"
						>
							<q-input
								v-model="popupEdit"
								dense
								autofocus
							/>
						</q-popup-edit>
					</template>
					<q-btn
						v-else-if="props.col.name === 'menu'"
						icon="more_vert"
						color="primary"
						flat
						round
						size="md"
					>
						<q-menu
							transition-show="jump-down"
							transition-hide="jump-up"
							square
						>
							<q-list>
								<entity-list-menu-item
									color="primary"
									icon="edit"
									:label="$t('Edit')"
									:to="'/' + entitySingular + '/' + props.row.id + '/edit'"
								/>
								<entity-list-menu-item
									color="negative"
									icon="delete"
									:label="$t('Delete')"
									@click="deletionMore(props)"
								/>
								<slot
									name="more-menu"
									:row="props.row"
								/>
							</q-list>
						</q-menu>
					</q-btn>
					<template
						v-else
					>
						{{ props.value }}
					</template>
				</q-td>
			</template>
		</q-table>
		<slot />
	</q-page>
</template>

<script>
import {
	QPage,
	QTable
} from 'quasar'
import EntityListMenuItem from './EntityListMenuItem'
import NegativeConfirmationDialog from './dialog/NegativeConfirmationDialog'
import DeleteButton from './buttons/DeleteButton'
export default {
	name: 'EntityListPage',
	components: {
		DeleteButton,
		NegativeConfirmationDialog,
		EntityListMenuItem,
		QPage,
		QTable
	},
	props: {
		isTableLoading: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Array,
			default: () => { return [] }
		},
		entities: {
			type: Array,
			default: () => { return [] }
		},
		pagination: {
			type: Object,
			default: () => { return {} }
		},
		filter: {
			type: String,
			default: null
		},
		entitySingular: {
			type: String,
			default: null
		},
		entityPlural: {
			type: String,
			default: null
		},
		addIcon: {
			type: String,
			default: 'add'
		}
	},
	data () {
		return {
			tableFullscreen: false,
			selectedRows: [],
			confirmDeletion: false,
			popupEdit: null
		}
	},
	computed: {
		fullscreenIcon () {
			if (!this.tableFullscreen) {
				return 'fullscreen'
			}
			return 'fullscreen_exit'
		},
		editButtonUrl () {
			if (this.selectedRows.length === 1) {
				return '/' + this.entitySingular + '/' + this.selectedRows[0].id + '/edit'
			} else {
				return ''
			}
		},
		paginationObject: {
			get () {
				return this.pagination
			},
			set (value) {
				this.$emit('request', {
					pagination: value,
					filter: this.filter
				})
			}
		}
	},
	mounted () {
		this.$emit('request', {
			pagination: this.pagination,
			filter: this.filter
		})
	},
	methods: {
		request (prop) {
			this.$emit('request', {
				pagination: prop.pagination,
				filter: this.filter
			})
		},
		toggleFullscreen () {
			this.tableFullscreen = !this.tableFullscreen
		},
		inputSearch (search) {
			this.$emit('request', {
				pagination: this.pagination,
				filter: search
			})
		},
		deleteEntity () {
			this.$emit('delete', this.selectedRows[0].id)
			this.selectedRows = []
		},
		toggleCell (input, cell) {
			this.$emit('toggle-cell', {
				row: cell.row.id,
				column: cell.col.name,
				value: input
			})
		},
		saveCell (props) {
			this.$emit('save-cell', {
				row: props.row.id,
				column: props.col.name,
				value: this.popupEdit
			})
		},
		deletionMore (props) {
			this.selectedRows = []
			this.selectedRows.push(props.row)
			this.confirmDeletion = true
		},
		popupEditShow (props) {
			this.popupEdit = props.row[props.col.name]
			this.selectRow(props.row)
		},
		rowClick (event, row) {
			this.selectRow(row)
		},
		selectRow (row) {
			this.selectedRows = []
			this.selectedRows.push(row)
		}
	}
}
</script>

<style lang="sass" rel="stylesheet/sass">
</style>
