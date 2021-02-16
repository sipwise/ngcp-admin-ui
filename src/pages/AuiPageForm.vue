<template>
	<q-page
		class="q-pa-md"
		style="padding-top: 118px"
	>
		<slot />
		<q-page-sticky
			expand
			position="top"
			class="q-pa-md bg-white"
		>
			<aui-page-title
				:title="title"
				:icon="icon"
				:loading="loading && titleLoading"
			/>
			<q-toolbar
				class="q-pl-md q-pr-md q-pt-sm q-pb-sm"
			>
				<q-btn
					class="q-mr-xs"
					icon="clear"
					color="primary"
					outline
					unelevated
					:to="listRoute"
					:label="$t('Close')"
					:disable="loading"
				/>
				<slot
					name="actions"
				/>
			</q-toolbar>
			<q-linear-progress
				v-if="loading"
				indeterminate
				size="2px"
			/>
		</q-page-sticky>
	</q-page>
</template>
<script>
import AuiPageTitle from 'components/AuiPageTitle'
export default {
	name: 'AuiPageForm',
	components: {
		AuiPageTitle
	},
	props: {
		title: {
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
		loading: {
			type: Boolean,
			required: true
		},
		titleLoading: {
			type: Boolean,
			required: false
		},
		icon: {
			type: String,
			default: undefined
		}
	}
}
</script>
