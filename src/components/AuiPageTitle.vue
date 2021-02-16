<template>
	<div
		class="text-h6 text-weight-light q-pl-lg full-width"
	>
		<template
			v-if="!loading"
		>
			<q-icon
				v-if="icon"
				:name="icon"
				color="grey-8"
				class="q-mr-sm"
			/>
			{{ title }}
		</template>
		<q-skeleton
			v-else
			type="text"
			height="32px"
		/>
	</div>
</template>

<script>
export default {
	name: 'AuiPageTitle',
	props: {
		title: {
			type: String,
			required: true
		},
		icon: {
			type: String,
			default: undefined
		},
		loading: {
			type: Boolean,
			required: true
		}
	}
}
</script>
