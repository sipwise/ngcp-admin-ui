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
							<entity-list-menu-item
								icon="vpn_key"
								color="primary"
								:label="$t('actions.changePassword')"
								@click="changePasswordDialog=true"
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
			<div
				:class="pinMenuButtonClasses"
			>
				<div
					class="col col-auto"
				>
					<q-btn
						:icon="pinMenuButtonIcon"
						color="primary"
						flat
						round
						@click="menuPinnedEvent"
					/>
				</div>
			</div>
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
		<change-password-dialog
			v-model="changePasswordDialog"
			:loading="isDialogRequesting"
			@change-password="changeAdministratorPassword({ password: $event.password })"
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
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
export default {
	name: 'MainLayout',
	components: {
		ChangePasswordDialog,
		EntityListMenuItem,
		CustomFooter,
		MainMenu,
		SipwiseLogo
	},
	data () {
		return {
			menuMinimized: false,
			menuPinned: true,
			leftDrawerOpen: true,
			changePasswordDialog: false
		}
	},
	computed: {
		...mapGetters('user', [
			'userName',
			'isLoggedIn',
			'isDialogRequesting',
			'hasDialogSucceeded'
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
		},
		pinMenuButtonIcon () {
			if (!this.menuPinned) {
				return 'fas fa-thumbtack'
			} else {
				return 'fas fa-caret-left'
			}
		},
		pinMenuButtonClasses () {
			const classes = ['pin-menu-button row items-center']
			if (!this.menuMinimized) {
				classes.push('justify-end')
				classes.push('q-pl-sm q-pr-sm')
			} else {
				classes.push('justify-center')
			}
			return classes
		}
	},
	watch: {
		hasDialogSucceeded (value) {
			if (value === true) {
				this.changePasswordDialog = false
				this.$q.notify({
					position: 'top',
					color: 'positive',
					icon: 'check',
					message: this.$t('notify.passwordChangedSuccessfully')
				})
			}
		}
	},
	methods: {
		...mapActions('user', [
			'logout',
			'loadUser'
		]),
		...mapActions('administrators', [
			'changeAdministratorPassword'
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

<style lang="sass" rel="stylesheet/sass">
	@import "../css/quasar.variables.sass"
	.pin-menu-button
		height: 50px
</style>
