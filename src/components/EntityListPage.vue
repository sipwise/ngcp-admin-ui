<template>
	<q-page
		class="q-pa-lg"
	>
		<q-dialog
			v-model="confirmDeletion"
			persistent
		>
			<q-card>
				<q-card-section
					class="row items-center"
				>
					<q-avatar
						icon="delete"
						color="negative"
						text-color="white"
					/>
					<span
						v-if="selectedRows.length === 1"
						class="q-ml-sm"
					>
						{{ $t('dialogs.deleteConfirmationText', { entity: entitySingular, name: selectedRows[0].login }) }}
					</span>
				</q-card-section>
				<q-card-actions
					align="right"
				>
					<q-btn
						v-close-popup
						flat
						:label="$t('actions.cancel')"
						color="primary"
					/>
					<q-btn
						v-close-popup
						unelevated
						:label="$t('actions.delete')"
						color="negative"
						@click="deleteEntity"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-table
			row-key="id"
			flat
			:loading="isTableLoading"
			:columns="columns"
			:data="entities"
			:fullscreen="tableFullscreen"
			:pagination="pagination"
			selection="single"
			:selected.sync="selectedRows"
			@request="request"
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
					:label="$t('genericAddButtonLabel', { entity: entitySingular })"
					:to="'/' + entitySingular + '/create'"
				/>
				<q-btn
					v-if="selectedRows.length === 1"
					class="q-mr-sm"
					icon="edit"
					:label="$t('actions.edit')"
					unelevated
					color="primary"
					:to="'/' + entitySingular + '/' + selectedRows[0].id + '/edit'"
				/>
				<q-btn
					v-if="selectedRows.length > 0"
					class="q-mr-sm"
					icon="delete"
					:label="$t('actions.delete')"
					unelevated
					color="negative"
					@click="confirmDeletion = true"
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
					:placeholder="$t('actions.search')"
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
		</q-table>
	</q-page>
</template>

<script>
import {
	QPage,
	QTable
} from 'quasar'
export default {
	name: 'EntityListPage',
	components: {
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
			confirmDeletion: false
		}
	},
	computed: {
		fullscreenIcon () {
			if (!this.tableFullscreen) {
				return 'fullscreen'
			}
			return 'fullscreen_exit'
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
		}
	}
}
</script>
