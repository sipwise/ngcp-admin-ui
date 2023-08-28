<template>
    <q-list
        class="bg-secondary"
        @mouseenter="$emit('mouseenter', $event)"
    >
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
        <div class="main-menu-items">
            <!-- eslint-disable-next-line vue/no-v-for-template-key-on-child -->
            <template v-for="(item, index) in itemsFiltered">
                <aui-main-menu-items
                    v-if="item.children && item.visible"
                    :key="item.key || index"
                    :children="item.children"
                    :icon="item.icon"
                    :label="item.label"
                    :active="item.active"
                    :filter-reg-exp="filterRegExp"
                />
                <aui-main-menu-item
                    v-else-if="item.visible"
                    :key="index"
                    :icon="item.icon"
                    :label="item.label"
                    :open-new-window="item.openNewWindow"
                    :to="item.to"
                    :href="item.href"
                    :active="item.active"
                    :filter-reg-exp="filterRegExp"
                />
            </template>
        </div>
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
        <div
            class="main-menu-favorite-pages"
        >
            <aui-main-menu-item
                v-for="(itemFavPage) in itemsFavPagesFiltered"
                :key="'aui-fav-' + itemFavPage.path"
                :icon="itemFavPage.icon"
                :label="itemFavPage.label"
                :to="{ path: itemFavPage.path }"
                :inset="true"
                :exact-active="true"
                :deletable="true"
                :filter-reg-exp="filterRegExp"
                @delete="deleteFavPage({ path: itemFavPage.path })"
            />
        </div>
    </q-list>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AuiMainMenuItems from 'components/AuiMainMenuItems'
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import _ from 'lodash'

export default {
    name: 'MainMenu',
    components: {
        AuiMainMenuItem,
        AuiMainMenuItems
    },
    props: {
        user: {
            type: Object,
            default: null
        },
        filter: {
            type: String,
            default: ''
        }
    },
    emits: ['mouseenter'],
    computed: {
        ...mapState('user', [
            'favPages',
            'capabilities',
            'platformInfo'
        ]),
        ...mapGetters('user', [
            'hasCapability'
        ]),
        dashboardItem () {
            return this.constructItemData({ name: 'dashboard' })
        },
        settingsRouteObjects () {
            return [
                { name: 'resellerPanelBrandingOverview' },
                { name: 'adminList' },
                { name: 'resellerList' },
                { name: 'customerList' },
                { name: 'contractList' },
                { name: 'contactList' },
                { name: 'domainList' },
                { name: 'subscriberList' },
                { name: 'subscriberProfileSetList' },
                { name: 'callListSuppressionList' },
                { name: 'billingProfileList' },
                { name: 'billingNetworkList' },
                { name: 'billingProfilePackageList' },
                { name: 'invoiceTemplateList' },
                { name: 'invoiceList' },
                { name: 'voucherList' },
                { name: 'peeringGroupList' },
                { name: 'rewriteRuleSetList' },
                { name: 'headerRuleSetList' },
                { name: 'ncosLevelList' },
                { name: 'ncosSetsList' },
                { name: 'soundSetList' },
                { name: 'emailTemplateList' },
                { name: 'deviceList' },
                { name: 'securityBans' },
                { name: 'maliciousCallList' },
                { name: 'lnpCarrierList' },
                { name: 'emergencyMappingContainerList' },
                { name: 'phonebookEntryList' },
                { name: 'timeSetList' }
            ]
        },
        isSettingsChildItemActive () {
            return this.containsActiveRoute(this.settingsRouteObjects)
        },
        settingsChildItems () {
            return this.settingsRouteObjects.map((routeObject) => {
                return this.constructItemData(routeObject)
            })
        },
        toolsRouteObjects () {
            return [
                { name: 'callRoutingVerifyList' },
                { name: 'peeringOverviewList' },
                { name: 'batchProvisioningList' }
            ]
        },
        isToolsChildItemActive () {
            return this.containsActiveRoute(this.toolsRouteObjects)
        },
        toolsChildItems () {
            return this.toolsRouteObjects.map((routeObject) => {
                return this.constructItemData(routeObject)
            })
        },
        monitoringRouteObjects () {
            return [
                { name: 'systemStatistics' },
                { name: 'processStatistics' },
                { name: 'rtpStatistics' },
                { name: 'sipStatistics' },
                { name: 'databaseStatistics' },
                { name: 'keydbStatistics' },
                { name: 'victoriametricsStatistics' },
                { name: 'kamStatistics' },
                { name: 'clusterOverview' },
                { name: 'sipCallFlowList' },
                { name: 'statisticsAdministration' }
            ]
        },
        isMonitoringChildItemActive () {
            return this.containsActiveRoute(this.monitoringRouteObjects)
        },
        monitoringChildItems () {
            return this.monitoringRouteObjects.map((routeObject) => {
                return this.constructItemData(routeObject)
            })
        },
        documentationRouteObjects () {
            return [
                { name: 'apiDoc' },
                { name: 'handbook' },
                { name: 'links' }
            ]
        },
        isDocumentationChildItemActive () {
            return this.containsActiveRoute(this.documentationRouteObjects)
        },
        documentationChildItems () {
            return this.documentationRouteObjects.map((routeObject) => {
                return this.constructItemData(routeObject)
            })
        },
        documentationChildItemsAll () {
            let externalDocumentation = _.get(this.platformInfo, 'external_documentation', [])
            if (!_.isArray(externalDocumentation)) {
                externalDocumentation = []
            }
            return [
                ...this.documentationChildItems,
                ...externalDocumentation.map(doc => {
                    return {
                        label: doc.name,
                        href: doc.url,
                        icon: 'fas fa-file-alt',
                        openNewWindow: true,
                        visible: this.$aclCan('read', 'doc.externaldocumentation')
                    }
                })
            ]
        },
        items () {
            return [
                this.dashboardItem,
                {
                    key: 'Settings',
                    label: this.$t('Settings'),
                    icon: 'fas fa-cogs',
                    visible: true,
                    children: this.settingsChildItems,
                    active: this.isSettingsChildItemActive
                },
                {
                    key: 'Tools',
                    label: this.$t('Tools'),
                    icon: 'fas fa-tools',
                    visible: this.$aclCan('read', 'tool.$hasChildTrue'),
                    children: this.toolsChildItems,
                    active: this.isToolsChildItemActive
                },
                {
                    key: 'Monitoring and Statistics',
                    label: this.$t('Monitoring & Statistics'),
                    icon: 'fas fa-chart-line',
                    visible: this.$aclCan('read', 'statistic.$hasChildTrue'),
                    children: this.monitoringChildItems,
                    active: this.isMonitoringChildItemActive
                },
                {
                    key: 'Documentation',
                    label: this.$t('Documentation'),
                    icon: 'fas fa-question-circle',
                    visible: this.$aclCan('read', 'doc.$hasChildTrue'),
                    children: this.documentationChildItemsAll,
                    active: this.isDocumentationChildItemActive
                }
            ]
        },
        filterRegExp () {
            if (this.filter === undefined || this.filter === null || _.trim(this.filter) === '') {
                return undefined
            } else {
                return new RegExp('(^|\\s+)' + _.escapeRegExp(this.filter), 'gi')
            }
        },
        itemsFiltered () {
            return this.filterItems(this.items)
        },
        itemsFavPages () {
            const itemsFavPages = []
            Object.keys(this.favPages).forEach((favPagePath) => {
                if (_.isObject(this.favPages[favPagePath])) {
                    itemsFavPages.push({
                        path: favPagePath,
                        icon: this.favPages[favPagePath].icon,
                        label: this.favPages[favPagePath].label
                    })
                }
            })
            return itemsFavPages
        },
        itemsFavPagesFiltered () {
            return this.filterItems(this.itemsFavPages)
        }
    },
    methods: {
        ...mapActions('user', [
            'deleteFavPage'
        ]),
        containsActiveRoute (routes) {
            return !!routes.find((route) => {
                const parentRouteName = this.$route?.meta?.parentPath?.split('.')[0]
                let parentActive = false
                if (parentRouteName) {
                    parentActive = route.name === parentRouteName
                }
                return route.name === this.$route.name || parentActive
            })
        },
        constructItemData (routeObject) {
            const routeData = this.$router.resolve(routeObject)
            return {
                to: routeObject,
                label: this.$routeMeta.$label(routeObject),
                icon: this.$routeMeta.$icon(routeObject),
                visible: this.$routeMeta.$isRouteAccessible(routeObject),
                openNewWindow: !!routeData?.meta?.openNewWindow
            }
        },
        filterItems (items) {
            if (!this.filterRegExp) {
                return items
            } else {
                return items.reduce((newItems, menuItem) => {
                    if (menuItem.children) {
                        menuItem.children.forEach((child) => {
                            if (this.filterRegExp.exec(child.label) !== null) {
                                newItems.push(child)
                            }
                        })
                    } else if (this.filterRegExp.exec(menuItem.label) !== null) {
                        newItems.push(menuItem)
                    }
                    return newItems
                }, [])
            }
        }
    }
}
</script>
