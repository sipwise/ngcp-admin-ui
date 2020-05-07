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
				<sipwise-logo
					class="q-ml-sm"
					style="height: 36px"
					color="light"
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
			show-if-above
			:mini="menuMinimized"
			@mouseover="maximizeMenu"
			@mouseout="minimizeMenu"
		>
			<main-menu />
		</q-drawer>
		<q-page-container>
			<router-view />
		</q-page-container>
		<custom-footer
			:show-minimise-button="true"
			:pinned="menuPinned"
			@menu-pinned="menuPinnedEvent"
		/>
	</q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import SipwiseLogo from '../components/SipwiseLogo'
import {
	mapActions
} from 'vuex'
import CustomFooter from '../components/CustomFooter'
export default {
	name: 'MainLayout',
	components: {
		CustomFooter,
		MainMenu,
		SipwiseLogo
	},
	data () {
		return {
			menuMinimized: false,
			menuPinned: true,
			leftDrawerOpen: true
		}
	},
	computed: {
		drawerWidth () {
			if (this.menuMinimized) {
				return 56
			} else {
				return 300
			}
		},
		logoWrapperStyle () {
			if (!this.menuMinimized) {
				return {
					height: '100px'
				}
			} else {
				return {
					height: '50px'
				}
			}
		}
	},
	methods: {
		...mapActions('user', [
			'logout'
		]),
		menuPinnedEvent () {
			this.menuPinned = !this.menuPinned
			this.menuMinimized = !this.menuPinned
		},
		maximizeMenu () {
			if (!this.menuPinned) {
				this.menuMinimized = false
			}
		},
		minimizeMenu () {
			if (!this.menuPinned) {
				this.menuMinimized = true
			}
		}
	}
}
</script>
