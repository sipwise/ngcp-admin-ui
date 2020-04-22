<template>
	<q-list
		class="bg-grey-2"
		padding
	>
		<template
			v-for="(item, index) in items"
		>
			<q-expansion-item
				v-if="item.children"
				:key="index"
				:icon="item.icon"
				:label="item.label"
			/>
			<q-item
				v-else
				:key="index"
				v-ripple
				clickable
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
					icon: 'home'
				},
				{
					label: this.$t('mainMenu.settings'),
					icon: 'apps',
					children: [
						{
							label: this.$t('mainMenu.settingsAdministrator')
						},
						{
							label: this.$t('mainMenu.settingsReseller')
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
