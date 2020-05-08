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
					v-if="isLoggedIn"
					flat
					dense
					icon="account_circle"
					aria-label="UserMenu"
					:label="userName"
				>
					<q-menu
						transition-show="jump-down"
						transition-hide="jump-up"
						square
						fit
					>
						<q-list>
							<entity-list-menu-item
								icon="logout"
								color="primary"
								:label="$t('login.logout')"
								@click="logout"
							/>
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
	mapActions,
	mapGetters
} from 'vuex'
import CustomFooter from '../components/CustomFooter'
import EntityListMenuItem from '../components/EntityListMenuItem'
export default {
	name: 'MainLayout',
	components: {
		EntityListMenuItem,
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
		...mapGetters('user', [
			'userName',
			'isLoggedIn'
		]),
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
	mounted () {
		this.loadUser()
	},
	methods: {
		...mapActions('user', [
			'logout',
			'loadUser'
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
