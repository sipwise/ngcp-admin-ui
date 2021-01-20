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
					:icon="(favPages[$route.path])?'star':'star_outline'"
					color="warning"
					flat
					dense
					round
					@click="toggleFavPage($route)"
				/>
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
								:label="$t('Logout')"
								@click="logout"
							/>
							<entity-list-menu-item
								icon="vpn_key"
								color="primary"
								:label="$t('Change password')"
								@click="changePasswordDialog=true"
							/>
							<q-item>
								<aui-selection-language
									:value="$t('English')"
								/>
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
			@mouseleave="minimizeMenu"
			@mouseenter="maximizeMenu"
		>
			<div
				:class="pinMenuButtonClasses"
			>
				<div
					class="col col-auto"
				>
					<q-btn
						v-if="!menuMinimized"
						:icon="pinMenuButtonIcon"
						color="grey-9"
						flat
						dense
						round
						@click="pinMenu"
					/>
				</div>
			</div>
			<main-menu
				:user="user"
			/>
		</q-drawer>
		<q-page-container>
			<router-view />
		</q-page-container>
		<custom-footer />
		<change-password-dialog
			v-model="changePasswordDialog"
			:loading="isDialogRequesting"
			@change-password="changeAdministratorPassword({ password: $event.password })"
		/>
		<q-inner-loading
			:showing="loginState === 'loggingOut'"
		/>
	</q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import SipwiseLogo from '../components/SipwiseLogo'
import AuiSelectionLanguage from '../components/AuiSelectionLanguage'
import {
	mapActions,
	mapMutations,
	mapGetters,
	mapState
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
		SipwiseLogo,
		AuiSelectionLanguage
	},
	data () {
		return {
			leftDrawerOpen: true,
			changePasswordDialog: false
		}
	},
	computed: {
		...mapState('user', [
			'user',
			'menuPinned',
			'menuMinimized',
			'loginState',
			'currentPathIframeError',
			'favPages'
		]),
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
					message: this.$t('Password changed successfully')
				})
			}
		},
		currentPathIframeError (error) {
			if (error !== undefined && error !== null) {
				this.$q.notify({
					position: 'top',
					color: 'negative',
					icon: 'error',
					message: error
				})
			}
		}
	},
	mounted () {
		this.loadMenuState()
	},
	methods: {
		...mapMutations('user', [
			'minimizeMenu',
			'maximizeMenu'
		]),
		...mapActions('user', [
			'logout',
			'pinMenu',
			'loadMenuState',
			'passwordReset',
			'toggleFavPage'
		]),
		...mapActions('administrators', [
			'changeAdministratorPassword'
		])
	}
}
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "../css/quasar.variables.sass"
	.pin-menu-button
		height: 50px
</style>
