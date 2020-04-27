<template>
	<q-layout view="lHh Lpr lFf">
		<q-header>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="leftDrawerOpen = !leftDrawerOpen"
				/>
				<q-space />
				<q-btn
					flat
					dense
					round
					icon="account_circle"
					aria-label="UserMenu"
				>
					<q-menu
						transition-show="flip-right"
						transition-hide="flip-left"
					>
						<q-list
							dense
						>
							<q-item
								clickable
								@click="logout"
							>
								<q-item-section
									avatar
								>
									<q-icon
										name="logout"
									/>
								</q-item-section>
								<q-item-section>
									Logout
								</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>
			</q-toolbar>
		</q-header>
		<q-drawer
			v-model="leftDrawerOpen"
			behavior="desktop"
			content-class="bg-grey-2"
		>
			<div
				class="flex-center flex"
				style="height: 120px"
			>
				<sipwise-logo
					style="height: 75px"
				/>
			</div>
			<main-menu />
		</q-drawer>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import SipwiseLogo from '../components/SipwiseLogo'
import {
	mapActions
} from 'vuex'
export default {
	name: 'MainLayout',
	components: {
		MainMenu,
		SipwiseLogo
	},
	data () {
		return {
			leftDrawerOpen: true
		}
	},
	computed: {
	},
	methods: {
		...mapActions('user', [
			'logout'
		])
	}
}
</script>
