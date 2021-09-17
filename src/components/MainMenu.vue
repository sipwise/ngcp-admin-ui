<template>
    <q-list
        class="bg-secondary q-mb-lg"
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
                v-if="item.children && item.visible"
                :key="index"
                :children="item.children"
                :icon="item.icon"
                :label="item.label"
                :active="item.active"
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
                v-if="itemFavPage.visible"
                :key="'aui-fav-' + _.isObject(itemFavPage.to) ? itemFavPage.to.name : itemFavPage.to"
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
import { mapGetters, mapState } from 'vuex'
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
        }
    },
    data () {
        return {
            filter: ''
        }
    },
    computed: {
        ...mapState('user', [
            'favPages',
            'capabilities',
            'platformInfo'
        ]),
        ...mapGetters('user', [
            'hasCapability'
        ]),
        userResellerId () {
            if (this.user && this.user.reseller_id) {
                return this.user.reseller_id
            }
            return ''
        },
        dashboardItem () {
            return this.constructItemData({ name: 'dashboard' })
        },
        settingsRouteObjects () {
            return [
                { name: 'resellerPanelBrandingOverview', params: { id: this.userResellerId } },
                { name: 'adminList' },
                { name: 'resellerList' },
                { name: 'customerList' },
                { name: 'contractList' },
                { name: 'contactList' },
                { name: 'domainList' },
                { name: 'subscriberList' },
                { name: 'subscriberProfileList' },
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
                { name: 'soundSetList' },
                { name: 'emailTemplateList' },
                { name: 'deviceList' },
                { name: 'securityBans' },
                { name: 'maliciousCallList' },
                { name: 'lnpList' },
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
                { name: 'handbook' }
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
                    label: this.$t('Settings'),
                    icon: 'fas fa-cogs',
                    visible: true,
                    children: this.settingsChildItems,
                    active: this.isSettingsChildItemActive
                },
                {
                    label: this.$t('Tools'),
                    icon: 'fas fa-tools',
                    visible: this.$aclCan('read', 'tool.$has'),
                    children: this.toolsChildItems,
                    active: this.isToolsChildItemActive
                },
                {
                    label: this.$t('Monitoring & Statistics'),
                    icon: 'fas fa-chart-line',
                    visible: this.$aclCan('read', 'statistic.$has'),
                    children: this.monitoringChildItems,
                    active: this.isMonitoringChildItemActive
                },
                {
                    label: this.$t('Documentation'),
                    icon: 'fas fa-question-circle',
                    visible: this.$aclCan('read', 'doc.$has'),
                    children: this.documentationChildItemsAll,
                    active: this.isDocumentationChildItemActive
                }
            ]
        },
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
                        if (child.to && this.favPages[child.to.name || child.to]) {
                            itemsFavPages.push(child)
                        }
                    })
                }
            })
            return itemsFavPages
        }
    },
    methods: {
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
            let visible = true
            const routeData = this.$router.resolve(routeObject)
            // Todo: Exclude capability and platformInfo check in helper methods
            // Todo: $routeMeta.$isCapabilityRequired(routeObject)
            // Todo: $routeMeta.$isCapabilityEnabled(routeObject)
            // Todo: $routeMeta.$isPlatformInfoRequired(routeObject)
            // Todo: $routeMeta.$isPlatformInfoEnabled(routeObject)
            const requiresCapability = !!routeData?.route?.meta?.capability
            const requiresPlatformInfo = !!routeData?.route?.meta?.platformInfo
            if (requiresCapability) {
                visible = visible && _.get(this.capabilities, routeData?.route?.meta?.capability, false)
            }
            if (requiresPlatformInfo) {
                visible = visible && _.get(this.platformInfo, routeData?.route?.meta?.platformInfo, false)
            }
            visible = visible && this.$routeMeta.$aclCan(routeObject)
            return {
                to: routeObject,
                label: this.$routeMeta.$label(routeObject),
                icon: this.$routeMeta.$icon(routeObject),
                visible: visible,
                openNewWindow: !!routeData?.route?.meta?.openNewWindow
            }
        }
    }
}
</script>
