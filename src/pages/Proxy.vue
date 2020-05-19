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
		position: relative
		min-width: 100%
		min-height: 100vh
		.proxy-iframe
			border: none
			position: absolute
			top: 0
			left: 0
			min-width: 100%
			min-height: 100vh
</style>
