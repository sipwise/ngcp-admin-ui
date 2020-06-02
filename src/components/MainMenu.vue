<template>
	<q-list
		class="bg-grey-2"
		style="margin-bottom: 50px; margin-top: 25px"
	>
		<template
			v-for="(item, index) in items"
		>
			<q-expansion-item
				v-if="item.children"
				:key="index"
				:icon="item.icon"
				icon-color="primary"
				:label="item.label"
				:content-inset-level="1"
				header-class="text-primary"
				group="main-menu"
				active-class="text-negative"
			>
				<q-list>
					<template
						v-for="(child, childIndex) in item.children"
					>
						<q-item
							v-if="child.link"
							:key="childIndex"
							v-ripple
							clickable
							tag="a"
							target="_blank"
							:href="$appConfig.ngcpPanelUrl + child.to"
						>
							<q-item-section
								v-if="child.icon"
								side
							>
								<q-icon
									:name="child.icon"
									color="primary"
									size="sm"
								/>
							</q-item-section>
							<q-item-section>
								<q-item-label>
									{{ child.label }}
								</q-item-label>
							</q-item-section>
						</q-item>
						<q-item
							v-else
							:key="childIndex"
							v-ripple
							clickable
							exact
							:to="child.to"
						>
							<q-item-section
								v-if="child.icon"
								side
							>
								<q-icon
									:name="child.icon"
									color="primary"
									size="sm"
								/>
							</q-item-section>
							<q-item-section>
								<q-item-label>
									{{ child.label }}
								</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-list>
			</q-expansion-item>
			<q-item
				v-else
				:key="index"
				v-ripple
				clickable
				:to="item.to"
			>
				<q-item-section
					avatar
				>
					<q-icon
						:name="item.icon"
						color="primary"
					/>
				</q-item-section>
				<q-item-section>
					<q-item-label>
						{{ item.label }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</template>
	</q-list>
</template>

<script>
import {
	QList,
	QItem,
	QExpansionItem,
	// QIcon,
	QItemSection,
	QItemLabel
} from 'quasar'

export default {
	name: 'MainMenu',
	components: {
		QList,
		QItem,
		QExpansionItem,
		QItemSection,
		QItemLabel
	},
	data () {
		return {
			items: [
				{
					label: this.$t('mainMenu.dashboard'),
					icon: 'fas fa-tachometer-alt',
					to: '/dashboard'
				},
				{
					label: this.$t('mainMenu.settings'),
					icon: 'fas fa-cogs',
					children: [
						{
							label: this.$t('mainMenu.settingsAdministrators'),
							to: '/administrator',
							icon: 'fas fa-user-cog'
						},
						{
							label: this.$t('mainMenu.settingsResellers'),
							to: '/reseller',
							icon: 'fas fa-user-tie'
						},
						{
							label: this.$t('mainMenu.settingsCustomers'),
							to: '/customer',
							icon: 'fas fa-users'
						},
						{
							label: this.$t('mainMenu.settingsContracts'),
							to: '/contract',
							icon: 'fas fa-handshake'
						},
						{
							label: this.$t('mainMenu.settingsContacts'),
							to: '/contact',
							icon: 'fas fa-address-card'
						},
						{
							label: this.$t('mainMenu.settingsDomains'),
							to: '/domain',
							icon: 'domain'
						},
						{
							label: this.$t('mainMenu.settingsSubscribers'),
							to: '/subscriber',
							icon: 'fas fa-user'
						},
						{
							label: this.$t('mainMenu.settingsSubscriberProfiles'),
							to: '/subscriberprofile',
							icon: 'far fa-user'
						},
						{
							label: this.$t('mainMenu.settingsCallListSuppressions'),
							to: '/calllistsuppression',
							icon: 'far fa-list-alt'
						},
						{
							label: this.$t('mainMenu.settingsBilling'),
							icon: 'fas fa-hand-holding-usd',
							to: '/billing'
						},
						{
							label: this.$t('mainMenu.settingsBillingNetworks'),
							to: '/network',
							icon: 'fas fa-credit-card'
						},
						{
							label: this.$t('mainMenu.settingsProfilePackages'),
							to: '/package',
							icon: 'fas fa-cubes'
						},
						{
							label: this.$t('mainMenu.settingsInvoiceTemplates'),
							to: '/invoicetemplate',
							icon: 'fas fa-file-invoice'
						},
						{
							label: this.$t('mainMenu.settingsInvoices'),
							to: '/invoice',
							icon: 'fas fa-file-invoice-dollar'
						},
						{
							label: this.$t('mainMenu.settingsBillingVouchers'),
							to: '/voucher',
							icon: 'fas fa-money-check-alt'
						},
						{
							label: this.$t('mainMenu.settingsSIPPeeringGroups'),
							to: '/peering',
							icon: 'fas fa-exchange-alt'
						},
						{
							label: this.$t('mainMenu.settingsRewriteRuleSets'),
							to: '/rewrite',
							icon: 'fas fa-file-alt'
						},
						{
							label: this.$t('mainMenu.settingsHeaderManipulations'),
							to: '/header',
							icon: 'fas fa-edit'
						},
						{
							label: this.$t('mainMenu.settingsNCOSLevels'),
							to: '/ncos',
							icon: 'fas fa-network-wired'
						},
						{
							label: this.$t('mainMenu.settingsSoundSets'),
							to: '/sound',
							icon: 'fas fa-music'
						},
						{
							label: this.$t('mainMenu.settingsEmailTemplates'),
							to: '/emailtemplate',
							icon: 'fas fa-envelope'
						},
						{
							label: this.$t('mainMenu.settingsSecurityBans'),
							to: '/security',
							icon: 'fas fa-ban'
						},
						{
							label: this.$t('mainMenu.settingsNumberPorting'),
							to: '/lnp',
							icon: 'fas fa-sim-card'
						},
						{
							label: this.$t('mainMenu.settingsEmergencyMappings'),
							to: '/emergencymapping',
							icon: 'fas fa-file-medical'
						},
						{
							label: this.$t('mainMenu.settingsPhonebook'),
							to: '/phonebook',
							icon: 'fas fa-address-book'
						},
						{
							label: this.$t('mainMenu.settingsTimeSet'),
							to: '/timeset',
							icon: 'fas fa-clock'
						}
					]
				},
				{
					label: this.$t('mainMenu.tools'),
					icon: 'fas fa-tools',
					children: [
						{
							label: this.$t('mainMenu.toolsCallRoutingVerification'),
							to: '/callroutingverify'
						},
						{
							label: this.$t('mainMenu.toolsPeeringOverview'),
							to: '/peeringoverview'
						},
						{
							label: this.$t('mainMenu.toolsBatchProvisioning'),
							to: '/batchprovisioning'
						}
					]
				},
				{
					label: this.$t('mainMenu.monitoring'),
					icon: 'fas fa-chart-line',
					children: [
						{
							label: this.$t('mainMenu.monitoringSystemStatistics'),
							to: '/grafana/d/system-statistics?ngcp_grafana_admin=no',
							icon: 'fas fa-chart-bar',
							link: true
						},
						{
							label: this.$t('mainMenu.monitoringSIPStatistics'),
							to: '/grafana/d/sip-statistics?ngcp_grafana_admin=no',
							icon: 'fas fa-phone-alt',
							link: true
						},
						{
							label: this.$t('mainMenu.monitoringDatabaseStatistics'),
							to: '/grafana/d/database-statistics?ngcp_grafana_admin=no',
							icon: 'fas fa-database',
							link: true
						},
						{
							label: this.$t('mainMenu.monitoringClusterOverview'),
							to: '/grafana/d/cluster-overview?ngcp_grafana_admin=no',
							icon: 'device_hub',
							link: true
						},
						{
							label: this.$t('mainMenu.monitoringSIPCallFlows'),
							icon: 'fas fa-exchange-alt',
							to: '/callflow'
						},
						{
							label: this.$t('mainMenu.monitoringStatisticsAdministration'),
							to: '/grafana/?ngcp_grafana_admin=yes',
							icon: 'fas fa-cog',
							link: true
						}
					]
				},
				{
					label: this.$t('mainMenu.documentation'),
					icon: 'fas fa-question-circle',
					children: [
						{
							label: this.$t('mainMenu.documentationAPI'),
							to: '/api/',
							icon: 'fas fa-file-alt',
							link: true

						},
						{
							label: this.$t('mainMenu.documentationHandbook'),
							to: '/handbook/',
							icon: 'fas fa-book',
							link: true
						}
					]
				}
			]
		}
	}
}
</script>
