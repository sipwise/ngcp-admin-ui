<template>
	<aui-page-form
		:title="resourceTitle"
		:icon="icon"
		:list-route="listRoute"
		:resource-singular="resourceSingular"
		:loading="loading"
		:title-loading="true"
	>
		<template
			v-slot:actions
		>
			<q-btn
				class="q-mr-xs"
				icon="save"
				color="primary"
				unelevated
				:label="$t('Save')"
				:loading="loading"
				:disable="loading || !inputChanged"
				@click="$emit('save')"
			/>
			<q-btn
				icon="undo"
				color="primary"
				unelevated
				:label="$t('Reset')"
				:disable="loading || !inputChanged"
				@click="$emit('reset')"
			/>
		</template>
		<slot />
	</aui-page-form>
</template>
<script>
import AuiPageForm from 'pages/AuiPageForm'
import { mapWaitingActions } from 'vue-wait'
export default {
	name: 'AuiPageFormUpdate',
	components: {
		AuiPageForm
	},
	props: {
		listRoute: {
			type: String,
			required: true
		},
		resource: {
			type: String,
			required: true
		},
		resourceId: {
			type: [String, Number],
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
		resourceCascade: {
			type: Object,
			default: undefined
		},
		loading: {
			type: Boolean,
			required: true
		},
		icon: {
			type: String,
			default: undefined
		},
		inputChanged: {
			type: Boolean,
			required: false
		}
	},
	computed: {
		resourceTitle () {
			if (this.resourceObject) {
				return this.$t('Edit {resourceSingular} {resourceName}', {
					resourceSingular: this.resourceSingular,
					resourceName: this.resourceObject[this.resourceNameField]
				})
			}
			return ''
		},
		resourceObject () {
			return this.$store.state.dataTable[this.resource + 'ResourceObject']
		},
		resourceCascadedObjects () {
			return this.$store.state.dataTable[this.resource + 'ResourceCascadedObjects']
		}
	},
	watch: {
		resourceObject (obj) {
			this.$emit('resource-loaded', {
				resourceObject: this.resourceObject,
				resourceCascadedObjects: this.resourceCascadedObjects
			})
		}
	},
	async mounted () {
		await this.load()
	},
	methods: {
		...mapWaitingActions('dataTable', {
			loadResource: 'aui-resource-object'
		}),
		async load () {
			await this.loadResource({
				resource: this.resource,
				resourceId: this.resourceId,
				resourceCascade: this.resourceCascade
			})
		}
	}
}
</script>
