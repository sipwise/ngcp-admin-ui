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
				<q-toolbar-title />
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
			<main-menu
				:items="mainMenuItems"
			/>
		</q-drawer>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import SipwiseLogo from '../components/SipwiseLogo'
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
		mainMenuItems () {
			return [
				{
					label: this.$t('mainMenu.administrators')
				},
				{
					label: this.$t('mainMenu.resellers')
				},
				{
					label: this.$t('mainMenu.customers')
				},
				{
					label: this.$t('mainMenu.resellerPeeringContracts')
				},
				{
					label: this.$t('mainMenu.contacts')
				},
				{
					label: this.$t('mainMenu.domains')
				},
				{
					label: this.$t('mainMenu.subscribers')
				},
				{
					label: this.$t('mainMenu.subscriberProfiles')
				}
			]
		}
	}
}
</script>
