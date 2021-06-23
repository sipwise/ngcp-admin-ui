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
            />
            <aui-main-menu-item
                v-else-if="item.visible"
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
import {
    QList,
    QItem
    // QExpansionItem,
    // QIcon,
    // QItemSection,
    // QItemLabel
} from 'quasar'
import { mapGetters, mapState } from 'vuex'
import AuiMainMenuItems from 'components/AuiMainMenuItems'
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import _ from 'lodash'

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
            filter: ''
        }
    },
    computed: {
        ...mapState('user', [
            'favPages', 'platformInfo'
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
        items () {
            return [
                {
                    label: this.$t('Dashboard'),
                    icon: 'fas fa-tachometer-alt',
                    to: '/dashboard',
                    visible: this.$aclCan('read', 'page.dashboard')
                },
                {
                    label: this.$t('Settings'),
                    icon: 'fas fa-cogs',
                    visible: true,
                    children: [
                        {
                            label: this.$t('Panel Branding'),
                            to: '/reseller/' + this.userResellerId + '/css',
                            icon: 'fas fa-palette',
                            visible: this.$aclCan('read', 'page.panelBranding')
                        },
                        {
                            to: { name: 'adminList' },
                            label: this.$routeMeta.$label({ name: 'adminList' }),
                            icon: this.$routeMeta.$icon({ name: 'adminList' }),
                            visible: this.$routeMeta.$aclCan({ name: 'adminList' })
                        },
                        {
                            to: { name: 'resellerList' },
                            label: this.$routeMeta.$label({ name: 'resellerList' }),
                            icon: this.$routeMeta.$icon({ name: 'resellerList' }),
                            visible: this.$routeMeta.$aclCan({ name: 'resellerList' })
                        },
                        {
                            to: { name: 'customerList' },
                            label: this.$routeMeta.$label({ name: 'customerList' }),
                            icon: this.$routeMeta.$icon({ name: 'customerList' }),
                            visible: this.$routeMeta.$aclCan({ name: 'customerList' })
                        },
                        {
                            to: { name: 'contractList' },
                            label: this.$routeMeta.$label({ name: 'contractList' }),
                            icon: this.$routeMeta.$icon({ name: 'contractList' }),
                            visible: this.$routeMeta.$aclCan({ name: 'contractList' })
                        },
                        {
                            to: { name: 'contactList' },
                            label: this.$routeMeta.$label({ name: 'contactList' }),
                            icon: this.$routeMeta.$icon({ name: 'contactList' }),
                            visible: this.$routeMeta.$aclCan({ name: 'contactList' })
                        },
                        {
                            to: { name: 'domainList' },
                            label: this.$routeMeta.$label({ name: 'domainList' }),
                            icon: this.$routeMeta.$icon({ name: 'domainList' }),
                            visible: this.$routeMeta.$aclCan({ name: 'domainList' })
                        },
                        {
                            label: this.$t('Subscribers'),
                            to: '/subscriber',
                            icon: 'fas fa-user',
                            visible: this.$aclCan('read', 'entity.subscribers')
                        },
                        {
                            label: this.$t('Subscriber Profiles'),
                            to: '/subscriberprofile',
                            icon: 'far fa-user',
                            visible: this.$aclCan('read', 'entity.subscriberprofiles')
                        },
                        {
                            label: this.$t('Call List Suppressions'),
                            to: '/calllistsuppression',
                            icon: 'far fa-list-alt',
                            visible: this.$aclCan('read', 'entity.calllistsuppressions')
                        },
                        {
                            label: this.$t('Billing Profiles'),
                            icon: 'fas fa-hand-holding-usd',
                            to: '/billing',
                            visible: this.$aclCan('read', 'entity.billingprofiles')
                        },
                        {
                            label: this.$t('Billing Networks'),
                            to: '/network',
                            icon: 'fas fa-credit-card',
                            visible: this.$aclCan('read', 'entity.billingnetworks')
                        },
                        {
                            label: this.$t('Profile Packages'),
                            to: '/package',
                            icon: 'fas fa-cubes',
                            visible: this.$aclCan('read', 'entity.profilepackages')
                        },
                        {
                            label: this.$t('Invoice Templates'),
                            to: '/invoicetemplate',
                            icon: 'fas fa-file-invoice',
                            visible: this.$aclCan('read', 'entity.invoicetemplates')
                        },
                        {
                            label: this.$t('Invoices'),
                            to: '/invoice',
                            icon: 'fas fa-file-invoice-dollar',
                            visible: this.$aclCan('read', 'entity.invoices')
                        },
                        {
                            label: this.$t('Billing Vouchers'),
                            to: '/voucher',
                            icon: 'fas fa-money-check-alt',
                            visible: this.$aclCan('read', 'entity.vouchers')
                        },
                        {
                            label: this.$t('SIP Peering Groups'),
                            to: '/peering',
                            icon: 'fas fa-exchange-alt',
                            visible: this.$aclCan('read', 'entity.peeringgroups')
                        },
                        {
                            label: this.$t('Rewrite Rule Sets'),
                            to: '/rewrite',
                            icon: 'fas fa-file-alt',
                            visible: this.$aclCan('read', 'entity.rewriterulesets')
                        },
                        {
                            label: this.$t('Header Manipulations'),
                            to: '/header',
                            icon: 'fas fa-edit',
                            visible: this.$aclCan('read', 'entity.headerrulesets')
                        },
                        {
                            label: this.$t('NCOS Levels'),
                            to: '/ncos',
                            icon: 'fas fa-layer-group',
                            visible: this.$aclCan('read', 'entity.ncoslevels')
                        },
                        {
                            label: this.$t('Sound Sets'),
                            to: '/sound',
                            icon: 'fas fa-music',
                            visible: this.$aclCan('read', 'entity.soundsets')
                        },
                        {
                            label: this.$t('Email Templates'),
                            to: '/emailtemplate',
                            icon: 'fas fa-envelope',
                            visible: this.$aclCan('read', 'entity.emailtemplates')
                        },
                        {
                            label: this.$t('Device Management'),
                            to: '/device',
                            icon: 'fas fa-fax',
                            visible: this.$aclCan('read', 'entity.pbxdevices') &&
                                this.hasCapability('cloudpbx')
                        },
                        {
                            label: this.$t('Security Bans'),
                            to: '/security',
                            icon: 'fas fa-ban',
                            visible: this.$aclCan('read', 'entity.bannedips') &&
                                this.$aclCan('read', 'entity.bannedusers')
                        },
                        {
                            label: this.$t('Malicious Calls'),
                            to: '/maliciouscall',
                            icon: 'fas fa-phone-alt',
                            visible: this.$aclCan('read', 'entity.maliciouscalls') &&
                                _.get(this.platformInfo, 'malicious_call')
                        },
                        {
                            label: this.$t('Number Porting'),
                            to: '/lnp',
                            icon: 'fas fa-sim-card',
                            visible: this.$aclCan('read', 'entity.lnpcarriers') &&
                                this.$aclCan('read', 'entity.lnpnumbers')
                        },
                        {
                            label: this.$t('Emergency Mappings'),
                            to: '/emergencymapping',
                            icon: 'fas fa-file-medical',
                            visible: this.$aclCan('read', 'entity.emergencymappingcontainers') &&
                                this.$aclCan('read', 'entity.emergencymappings')
                        },
                        {
                            label: this.$t('Phonebook'),
                            to: '/phonebook',
                            icon: 'fas fa-address-book',
                            visible: this.$aclCan('read', 'entity.phonebookentries')
                        },
                        {
                            label: this.$t('Time Set'),
                            to: '/timeset',
                            icon: 'fas fa-clock',
                            visible: this.$aclCan('read', 'entity.timesets')
                        }
                    ]
                },
                {
                    label: this.$t('Tools'),
                    icon: 'fas fa-tools',
                    visible: this.$aclCan('read', 'tool.$has'),
                    children: [
                        {
                            label: this.$t('Call Routing Verification'),
                            to: '/callroutingverify',
                            icon: 'fas fa-tty',
                            visible: this.$aclCan('read', 'tool.callroutingverify')
                        },
                        {
                            label: this.$t('Peering Overview'),
                            to: '/peeringoverview',
                            icon: 'fas fa-binoculars',
                            visible: this.$aclCan('read', 'tool.peeringoverview')
                        },
                        {
                            label: this.$t('Batch Provisioning'),
                            to: '/batchprovisioning',
                            icon: 'fas fa-users-cog',
                            visible: this.$aclCan('read', 'tool.batchprovisioning')
                        }
                    ]
                },
                {
                    label: this.$t('Monitoring & Statistics'),
                    icon: 'fas fa-chart-line',
                    visible: this.$aclCan('read', 'statistic.$has'),
                    children: [
                        {
                            label: this.$t('System Statistics'),
                            to: '/grafana/d/system-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-chart-bar',
                            link: true,
                            visible: this.$aclCan('read', 'statistic.systemstatistics')
                        },
                        {
                            label: this.$t('RTP Statistics'),
                            to: '/grafana/d/rtp-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-phone-alt',
                            link: true,
                            visible: this.$aclCan('read', 'statistic.rtpstatistics')
                        },
                        {
                            label: this.$t('SIP Statistics'),
                            to: '/grafana/d/sip-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-phone-alt',
                            link: true,
                            visible: this.$aclCan('read', 'statistic.sipstatistics')
                        },
                        {
                            label: this.$t('Database Statistics'),
                            to: '/grafana/d/database-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-database',
                            link: true,
                            visible: this.$aclCan('read', 'statistic.databasestatistics')
                        },
                        {
                            label: this.$t('Cluster Overview'),
                            to: '/grafana/d/cluster-overview?ngcp_grafana_admin=no',
                            icon: 'device_hub',
                            link: true,
                            visible: this.$aclCan('read', 'statistic.clusteroverview')
                        },
                        {
                            label: this.$t('SIP Call Flows'),
                            icon: 'fas fa-exchange-alt',
                            to: '/callflow',
                            visible: this.$aclCan('read', 'statistic.sipcallflows')
                        },
                        {
                            label: this.$t('Statistics Administration'),
                            to: '/grafana/?ngcp_grafana_admin=yes',
                            icon: 'fas fa-cog',
                            link: true,
                            visible: this.$aclCan('read', 'statistic.statisticsadministration')
                        }
                    ]
                },
                {
                    label: this.$t('Documentation'),
                    icon: 'fas fa-question-circle',
                    visible: this.$aclCan('read', 'doc.$has'),
                    children: [
                        {
                            label: this.$t('API'),
                            to: '/api/',
                            icon: 'fas fa-file-alt',
                            link: true,
                            visible: this.$aclCan('read', 'doc.api')
                        },
                        {
                            label: this.$t('Handbook'),
                            to: '/handbook/',
                            icon: 'fas fa-book',
                            link: true,
                            visible: this.$aclCan('read', 'doc.handbook')
                        }
                    ]
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
    }
}
</script>
