<template>
	<q-page
		style="height: calc(100vh - 100px)"
		class="q-pa-md"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div
			v-if="!$wait.is('aui-preferences-context') && resourceContext"
			class="text-h6 text-weight-light q-pl-lg"
		>
			{{ $t('{resourceSingular} preferences for {resourceName}', {
				resourceSingular: resourceSingular,
				resourceName: resourceContext[resourceNameField]
			}) }}
		</div>
		<div
			v-else
			class="row q-pl-lg"
		>
			<q-skeleton
				class="col-6"
				type="text"
				height="32px"
			/>
		</div>
		<q-toolbar
			class="q-pl-md q-pr-md q-pt-sm q-pb-sm"
		>
			<q-btn
				icon="list"
				color="primary"
				unelevated
				:to="listRoute"
				:label="$t('{resourceSingular} list', {
					resourceSingular: resourceSingular
				})"
			/>
			<q-space />
			<q-select
				v-model="preferencesCategory"
				style="min-width: 200px"
				class="q-mr-sm"
				:options="categoryOptions"
				:label="$t('Category')"
				dense
				square
				filled
				map-options
				emit-value
				clearable
			/>
			<aui-input-search
				v-model.trim="preferencesSearch"
				style="width: 200px"
				clearable
			/>
		</q-toolbar>
		<q-linear-progress
			v-if="$wait.is('aui-preferences-*')"
			indeterminate
			size="2px"
		/>
		<aui-preferences
			:preferences-id="preferencesId"
			:resource="resource"
			:resource-id="resourceId"
			:resource-data="resourceData"
			:resource-schema="resourceSchema"
			:search="preferencesSearch"
			:category="preferencesCategory"
			:preferences-extension="preferencesExtension"
		/>
	</q-page>
</template>

<script>
import AuiPreferences from 'components/AuiPreferences'
import { mapActions } from 'vuex'
import AuiInputSearch from 'components/input/AuiInputSearch'

export default {
	components: {
		AuiInputSearch,
		AuiPreferences
	},
	props: {
		preferencesId: {
			type: String,
			required: true
		},
		listRoute: {
			type: String,
			required: true
		},
		resourceSingular: {
			type: String,
			required: true
		},
		resourceNameField: {
			type: String,
			required: true
		},
		resource: {
			type: String,
			required: true
		},
		resourceData: {
			type: String,
			required: true
		},
		resourceSchema: {
			type: String,
			required: true
		},
		preferencesExtension: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data () {
		return {
			preferencesSearch: '',
			preferencesCategory: null
		}
	},
	computed: {
		resourceId () {
			return this.$route.params.id
		},
		waitIdentifier () {
			return 'aui-preferences-' + this.preferencesId + '*'
		},
		resourceContext () {
			if (this.preferencesId) {
				return this.$store.state.dataTable[this.preferencesId + 'PreferencesContext']
			}
			return {}
		},
		preferencesSchema () {
			const schema = this.$store.state.dataTable[this.preferencesId + 'PreferencesSchema']
			if (!schema) {
				return []
			}
			return schema
		},
		categoryOptions () {
			const options = []
			this.preferencesSchema.forEach((group) => {
				options.push({
					value: group[0],
					label: group[0]
				})
			})
			return options
		}
	},
	mounted () {
		this.loadPreferencesContext({
			preferencesId: this.preferencesId,
			resourceId: this.resourceId,
			resource: this.resource
		})
		this.loadPreferencesSchema({
			preferencesId: this.preferencesId,
			resourceSchema: this.resourceSchema
		})
		this.loadPreferencesData({
			preferencesId: this.preferencesId,
			resourceData: this.resourceData,
			resourceId: this.resourceId
		})
	},
	methods: {
		...mapActions('dataTable', [
			'loadPreferencesContext',
			'loadPreferencesSchema',
			'loadPreferencesData'
		])
	}
}
</script>
