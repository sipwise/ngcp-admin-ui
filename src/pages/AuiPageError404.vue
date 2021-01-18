<template>
	<div class="fixed-center text-center">
		<p>
			<img
				src="~assets/sad.svg"
				style="width:30vw;max-width:150px;"
			>
		</p>
		<p class="text-faded">
			{{ $t('Sorry, nothing here!') }} <strong>(404)</strong>
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
	name: 'AuiPageError404',
	methods: {
		...mapActions('user', [
			'logout'
		])
	}
}
</script>
