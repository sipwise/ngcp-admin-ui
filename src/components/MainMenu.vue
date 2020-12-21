<template>
	<q-list
		class="bg-grey-2 q-mb-lg"
		@mouseenter="$emit('mouseenter', $event)"
	>
		<q-item>
			<q-item-section>
				<q-input
					v-model="filter"
					dense
					clearable
					:label="$t('Search menu')"
				>
					<template
						v-slot:prepend
					>
						<q-icon
							color="grey"
							name="search"
						/>
					</template>
				</q-input>
			</q-item-section>
		</q-item>
		<q-item
			v-if="itemsFiltered.length === 0"
		>
			<q-item-section
				side
			>
				<q-icon
					color="grey"
					name="sentiment_dissatisfied"
				/>
			</q-item-section>
			<q-item-section>
				{{ $t('No menu items found') }}
			</q-item-section>
		</q-item>
		<template
			v-for="(item, index) in itemsFiltered"
		>
			<aui-main-menu-items
				v-if="item.children && $acl.check(item.permission)"
				:key="index"
				:children="item.children"
				:icon="item.icon"
				:label="item.label"
			/>
			<aui-main-menu-item
				v-else-if="$acl.check(item.permission)"
				:key="index"
				:icon="item.icon"
				:label="item.label"
				:link="item.link"
				:to="item.to"
			/>
		</template>
		<q-item
			class="q-mt-lg"
		>
			<q-item-section
				side
			>
				<q-icon
					name="star"
					color="warning"
					size="sm"
				/>
			</q-item-section>
			<q-item-section>
				<q-item-label>
					{{ $t('Favourite pages') }}
				</q-item-label>
			</q-item-section>
		</q-item>
		<q-separator
			inset
		/>
		<template
			v-for="(itemFavPage) in itemsFavPages"
		>
			<aui-main-menu-item
				v-if="$acl.check(itemFavPage.permission)"
				:key="'aui-fav-' + itemFavPage.to"
				:icon="itemFavPage.icon"
				:label="itemFavPage.label"
				:link="itemFavPage.link"
				:to="itemFavPage.to"
				:inset="true"
			/>
		</template>
	</q-list>
</template>

<script>
import {
	QList,
	QItem
	// QExpansionItem,
	// QIcon,
	// QItemSection,
	// QItemLabel
} from 'quasar'
import { mapState } from 'vuex'
import AuiMainMenuItems from 'components/AuiMainMenuItems'
import AuiMainMenuItem from 'components/AuiMainMenuItem'

export default {
	name: 'MainMenu',
	components: {
		AuiMainMenuItem,
		AuiMainMenuItems,
		QList,
		QItem
	},
	props: {
		user: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			filter: '',
			items: [
				{
					label: this.$t('mainMenu.dashboard'),
					icon: 'fas fa-tachometer-alt',
					to: '/dashboard',
					permission: '*'
				},
				{
					label: this.$t('mainMenu.settings'),
					icon: 'fas fa-cogs',
					permission: '*',
					children: [
						{
							label: this.$t('mainMenu.settingsPanelBranding'),
							to: '/reseller/' + this.user.reseller_id + '/css',
							icon: 'fas fa-palette',
							permission: ['reseller']
						},
						{
							label: this.$t('mainMenu.settingsAdministrators'),
							to: '/administrator',
							icon: 'fas fa-user-cog',
							permission: ['admin', 'reseller', 'lintercept']
						},
						{
							label: this.$t('mainMenu.settingsResellers'),
							to: '/reseller',
							icon: 'fas fa-users',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsCustomers'),
							to: '/customer',
							icon: 'fas fa-user-tie',
							permission: ['admin', 'reseller', 'ccare', 'ccareadmin']
						},
						{
							label: this.$t('mainMenu.settingsContracts'),
							to: '/contract',
							icon: 'fas fa-handshake',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsContacts'),
							to: '/contact',
							icon: 'fas fa-address-card',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsDomains'),
							to: '/domain',
							icon: 'fas fa-network-wired',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsSubscribers'),
							to: '/subscriber',
							icon: 'fas fa-user',
							permission: ['admin', 'reseller', 'ccare', 'ccareadmin']
						},
						{
							label: this.$t('mainMenu.settingsSubscriberProfiles'),
							to: '/subscriberprofile',
							icon: 'far fa-user',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsCallListSuppressions'),
							to: '/calllistsuppression',
							icon: 'far fa-list-alt',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsBilling'),
							icon: 'fas fa-hand-holding-usd',
							to: '/billing',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsBillingNetworks'),
							to: '/network',
							icon: 'fas fa-credit-card',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsProfilePackages'),
							to: '/package',
							icon: 'fas fa-cubes',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsInvoiceTemplates'),
							to: '/invoicetemplate',
							icon: 'fas fa-file-invoice',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsInvoices'),
							to: '/invoice',
							icon: 'fas fa-file-invoice-dollar',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsBillingVouchers'),
							to: '/voucher',
							icon: 'fas fa-money-check-alt',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsSIPPeeringGroups'),
							to: '/peering',
							icon: 'fas fa-exchange-alt',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsRewriteRuleSets'),
							to: '/rewrite',
							icon: 'fas fa-file-alt',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsHeaderManipulations'),
							to: '/header',
							icon: 'fas fa-edit',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsNCOSLevels'),
							to: '/ncos',
							icon: 'fas fa-layer-group',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsSoundSets'),
							to: '/sound',
							icon: 'fas fa-music',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsEmailTemplates'),
							to: '/emailtemplate',
							icon: 'fas fa-envelope',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsDeviceManagement'),
							to: '/device',
							icon: 'fas fa-fax',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsSecurityBans'),
							to: '/security',
							icon: 'fas fa-ban',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsNumberPorting'),
							to: '/lnp',
							icon: 'fas fa-sim-card',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.settingsEmergencyMappings'),
							to: '/emergencymapping',
							icon: 'fas fa-file-medical',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsPhonebook'),
							to: '/phonebook',
							icon: 'fas fa-address-book',
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.settingsTimeSet'),
							to: '/timeset',
							icon: 'fas fa-clock',
							permission: ['admin']
						}
					]
				},
				{
					label: this.$t('mainMenu.tools'),
					icon: 'fas fa-tools',
					permission: ['admin', 'reseller', 'ccareadmin'],
					children: [
						{
							label: this.$t('mainMenu.toolsCallRoutingVerification'),
							to: '/callroutingverify',
							icon: 'fas fa-tty',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.toolsPeeringOverview'),
							to: '/peeringoverview',
							icon: 'fas fa-binoculars',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.toolsBatchProvisioning'),
							to: '/batchprovisioning',
							icon: 'fas fa-users-cog',
							permission: ['admin', 'reseller', 'ccareadmin']
						}
					]
				},
				{
					label: this.$t('mainMenu.monitoring'),
					icon: 'fas fa-chart-line',
					permission: 'admin',
					children: [
						{
							label: this.$t('mainMenu.monitoringSystemStatistics'),
							to: '/grafana/d/system-statistics?ngcp_grafana_admin=no',
							icon: 'fas fa-chart-bar',
							link: true,
							permission: 'admin'
						},
						{
							label: this.$t('mainMenu.monitoringSIPStatistics'),
							to: '/grafana/d/sip-statistics?ngcp_grafana_admin=no',
							icon: 'fas fa-phone-alt',
							link: true,
							permission: 'admin'
						},
						{
							label: this.$t('mainMenu.monitoringDatabaseStatistics'),
							to: '/grafana/d/database-statistics?ngcp_grafana_admin=no',
							icon: 'fas fa-database',
							link: true,
							permission: 'admin'
						},
						{
							label: this.$t('mainMenu.monitoringClusterOverview'),
							to: '/grafana/d/cluster-overview?ngcp_grafana_admin=no',
							icon: 'device_hub',
							link: true,
							permission: 'admin'
						},
						{
							label: this.$t('mainMenu.monitoringSIPCallFlows'),
							icon: 'fas fa-exchange-alt',
							to: '/callflow',
							permission: ['admin']
						},
						{
							label: this.$t('mainMenu.monitoringStatisticsAdministration'),
							to: '/grafana/?ngcp_grafana_admin=yes',
							icon: 'fas fa-cog',
							link: true,
							permission: 'admin'
						}
					]
				},
				{
					label: this.$t('mainMenu.documentation'),
					icon: 'fas fa-question-circle',
					permission: '*',
					children: [
						{
							label: this.$t('mainMenu.documentationAPI'),
							to: '/api/',
							icon: 'fas fa-file-alt',
							link: true,
							permission: ['admin', 'reseller']
						},
						{
							label: this.$t('mainMenu.documentationHandbook'),
							to: '/handbook/',
							icon: 'fas fa-book',
							link: true,
							permission: ['admin', 'reseller', 'ccare', 'lintercept', 'ccareadmin']
						}
					]
				}
			]
		}
	},
	computed: {
		...mapState('user', [
			'favPages'
		]),
		itemsFiltered () {
			if (this.filter === undefined || this.filter === null || this.filter === '') {
				return this.items
			} else {
				return this.items.reduce((newItems, menuItem) => {
					if (menuItem.children) {
						menuItem.children.forEach((child) => {
							if (child.label.toLowerCase().startsWith(this.filter.toLowerCase())) {
								newItems.push(child)
							}
						})
					} else if (menuItem.label.toLowerCase().startsWith(this.filter.toLowerCase())) {
						newItems.push(menuItem)
					}
					return newItems
				}, [])
			}
		},
		itemsFavPages () {
			const itemsFavPages = []
			this.items.forEach((item) => {
				if (item.to && this.favPages[item.to]) {
					itemsFavPages.push(item)
				} else if (item.children) {
					item.children.forEach((child) => {
						if (child.to && this.favPages[child.to]) {
							itemsFavPages.push(child)
						}
					})
				}
			})
			return itemsFavPages
		}
	},
	methods: {
		search () {

		}
	}
}
</script>
