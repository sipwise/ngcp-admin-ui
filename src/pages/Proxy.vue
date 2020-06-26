<template>
	<div
		class="proxy-iframe-wrapper flex flex-center"
	>
		<iframe
			v-show="loaded"
			ref="proxyIframe"
			class="proxy-iframe"
			:src="$appConfig.ngcpPanelUrl + $route.path + '?framed=1'"
			@load="loadedEvent"
		/>
		<q-spinner
			v-if="!loaded"
			color="primary"
			size="xl"
		/>
	</div>
</template>

<script>
import {
	mapActions
} from 'vuex'
export default {
	name: 'Proxy',
	data () {
		return {
			loaded: false
		}
	},
	methods: {
		loadedEvent (event, data) {
			const domEl = this.$refs.proxyIframe.contentWindow.document.getElementById('login_page_v1')
			if (domEl !== null) {
				this.logout()
			} else {
				this.loaded = true
			}
		},
		...mapActions('user', [
			'logout'
		])
	}
}
</script>

<style lang="sass" rel="stylesheet/sass">
	.proxy-iframe-wrapper
		height: calc(100vh - 100px)
		width: 100%
		.proxy-iframe
			border: none
			height: calc(100vh - 100px)
			width: 100%
</style>
