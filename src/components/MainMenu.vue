<template>
	<q-list
		class="bg-grey-2"
		style="margin-top: 50px"
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
			>
				<q-list>
					<q-item
						v-for="(child, childIndex) in item.children"
						:key="childIndex"
						v-ripple
						clickable
						:to="child.to"
					>
						<q-item-section
							avatar
						>
							<q-icon
								v-if="child.icon"
								:name="child.icon"
								color="primary"
							/>
						</q-item-section>
						<q-item-section>
							<q-item-label>
								{{ child.label }}
							</q-item-label>
						</q-item-section>
					</q-item>
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
		// QIcon,
		QItemSection,
		QItemLabel
	},
	data () {
		return {
			items: [
				{
					label: this.$t('mainMenu.dashboard'),
					icon: 'home',
					to: '/dashboard'
				},
				{
					label: this.$t('mainMenu.settings'),
					icon: 'apps',
					children: [
						{
							label: this.$t('mainMenu.settingsAdministrators'),
							to: '/administrator',
							icon: 'person'
						},
						{
							label: this.$t('mainMenu.settingsResellers'),
							to: '/reseller',
							icon: 'group'
						}
					]
				},
				{
					label: this.$t('mainMenu.tools'),
					icon: 'settings'
				},
				{
					label: this.$t('mainMenu.monitoring'),
					icon: 'bar_chart'
				},
				{
					label: this.$t('mainMenu.documentation'),
					icon: 'help'
				}
			]
		}
	}
}
</script>
