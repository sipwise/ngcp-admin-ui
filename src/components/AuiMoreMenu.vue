<template>
	<q-btn
		icon="more_vert"
		color="primary"
		flat
		dense
		square
	>
		<aui-popup-menu>
			<slot />
		</aui-popup-menu>
	</q-btn>
</template>
<script>
import AuiPopupMenu from 'components/AuiPopupMenu'
export default {
	name: 'AuiMoreMenu',
	components: {
		AuiPopupMenu
	}
}
</script>
