<template>
	<div class="fixed-center text-center">
		<p>
			<img
				src="~assets/sad.svg"
				style="width:30vw;max-width:150px;"
			>
		</p>
		<p class="text-faded">
			{{ $t('Sorry, forbidden!') }} <strong>(403)</strong>
		</p>
		<q-btn
			color="secondary"
			style="width:200px;"
			:label="$t('Go back')"
			to="/dashboard"
		/>
	</div>
</template>

<script>
import {
	mapActions
} from 'vuex'
export default {
	name: 'AuiPageError403',
	methods: {
		...mapActions('user', [
			'logout'
		])
	}
}
</script>
