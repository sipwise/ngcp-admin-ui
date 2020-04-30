<template>
	<q-layout view="hHh lpR fFf">
		<q-page-container>
			<router-view />
		</q-page-container>
		<custom-footer />
	</q-layout>
</template>

<script>
import CustomFooter from '../components/CustomFooter'
export default {
	components: {
		CustomFooter
	},
	methods: {
	}
}
</script>
