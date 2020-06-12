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
export default {
	name: 'Proxy',
	data () {
		return {
			loaded: false
		}
	},
	methods: {
		loadedEvent (event, data) {
			this.loaded = true
		}
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
