<template>
	<q-footer
		class="bg-white text-primary"
	>
		<q-toolbar>
			<q-toolbar-title />
			<q-btn
				color="primary"
				unelevated
				flat
				icon-right="logout"
				:label="$t('goToOldAdminPanel')"
				@click="goToOldAdminPanel"
			/>
		</q-toolbar>
	</q-footer>
</template>

<script>
export default {
	name: 'CustomFooter',
	methods: {
		goToOldAdminPanel () {
			document.location.href = this.$appConfig.ngcpPanelUrl + '/login'
		}
	}
}
</script>
