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
			>
				<q-menu
					no-parent-event
					persistent
					:value="goToOldAdminPanelInfo"
					transition-show="flip-up"
					transition-hide="flip-down"
				>
					<q-banner
						class="bg-info text-white"
						dense
					>
						{{ $t('goToOldAdminPanelInfo') }}
						<q-btn
							flat
							color="white"
							:label="$t('closeActionLabel')"
							@click="closeGoToOldAdminPanelInfo"
						/>
						<template v-slot:avatar>
							<q-icon
								name="info"
								color="white"
							/>
						</template>
					</q-banner>
				</q-menu>
			</q-btn>
		</q-toolbar>
	</q-footer>
</template>

<script>
import {
	mapState,
	mapActions
} from 'vuex'
export default {
	name: 'CustomFooter',
	computed: {
		...mapState('user', [
			'goToOldAdminPanelInfo'
		])
	},
	mounted () {
		this.loadGoToOldAdminPanelInfo()
	},
	methods: {
		goToOldAdminPanel () {
			document.location.href = this.$appConfig.ngcpPanelUrl + this.$route.path
		},
		...mapActions('user', [
			'closeGoToOldAdminPanelInfo',
			'loadGoToOldAdminPanelInfo'
		])
	}
}
</script>
