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
            filter: ''
        }
    },
    computed: {
        ...mapState('user', [
            'favPages'
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
                    permission: '*'
                },
                {
                    label: this.$t('Settings'),
                    icon: 'fas fa-cogs',
                    permission: '*',
                    children: [
                        {
                            label: this.$t('Panel Branding'),
                            to: '/reseller/' + this.userResellerId + '/css',
                            icon: 'fas fa-palette',
                            permission: ['reseller']
                        },
                        {
                            label: this.$t('Administrators'),
                            to: '/administrator',
                            icon: 'fas fa-user-cog',
                            permission: ['admin', 'reseller', 'lintercept']
                        },
                        {
                            label: this.$t('Resellers'),
                            to: '/reseller',
                            icon: 'fas fa-users',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Customers'),
                            to: '/customer',
                            icon: 'fas fa-user-tie',
                            permission: ['admin', 'reseller', 'ccare', 'ccareadmin']
                        },
                        {
                            label: this.$t('Contracts'),
                            to: '/contract',
                            icon: 'fas fa-handshake',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Contacts'),
                            to: '/contact',
                            icon: 'fas fa-address-card',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Domains'),
                            to: '/domain',
                            icon: 'fas fa-network-wired',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Subscribers'),
                            to: '/subscriber',
                            icon: 'fas fa-user',
                            permission: ['admin', 'reseller', 'ccare', 'ccareadmin']
                        },
                        {
                            label: this.$t('Subscriber Profiles'),
                            to: '/subscriberprofile',
                            icon: 'far fa-user',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Call List Suppressions'),
                            to: '/calllistsuppression',
                            icon: 'far fa-list-alt',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Billing Profiles'),
                            icon: 'fas fa-hand-holding-usd',
                            to: '/billing',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Billing Networks'),
                            to: '/network',
                            icon: 'fas fa-credit-card',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Profile Packages'),
                            to: '/package',
                            icon: 'fas fa-cubes',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Invoice Templates'),
                            to: '/invoicetemplate',
                            icon: 'fas fa-file-invoice',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Invoices'),
                            to: '/invoice',
                            icon: 'fas fa-file-invoice-dollar',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Billing Vouchers'),
                            to: '/voucher',
                            icon: 'fas fa-money-check-alt',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('SIP Peering Groups'),
                            to: '/peering',
                            icon: 'fas fa-exchange-alt',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Rewrite Rule Sets'),
                            to: '/rewrite',
                            icon: 'fas fa-file-alt',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Header Manipulations'),
                            to: '/header',
                            icon: 'fas fa-edit',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('NCOS Levels'),
                            to: '/ncos',
                            icon: 'fas fa-layer-group',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Sound Sets'),
                            to: '/sound',
                            icon: 'fas fa-music',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Email Templates'),
                            to: '/emailtemplate',
                            icon: 'fas fa-envelope',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Device Management'),
                            to: '/device',
                            icon: 'fas fa-fax',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Security Bans'),
                            to: '/security',
                            icon: 'fas fa-ban',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Number Porting'),
                            to: '/lnp',
                            icon: 'fas fa-sim-card',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Emergency Mappings'),
                            to: '/emergencymapping',
                            icon: 'fas fa-file-medical',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Phonebook'),
                            to: '/phonebook',
                            icon: 'fas fa-address-book',
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Time Set'),
                            to: '/timeset',
                            icon: 'fas fa-clock',
                            permission: ['admin']
                        }
                    ]
                },
                {
                    label: this.$t('Tools'),
                    icon: 'fas fa-tools',
                    permission: ['admin', 'reseller', 'ccareadmin'],
                    children: [
                        {
                            label: this.$t('Call Routing Verification'),
                            to: '/callroutingverify',
                            icon: 'fas fa-tty',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Peering Overview'),
                            to: '/peeringoverview',
                            icon: 'fas fa-binoculars',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Batch Provisioning'),
                            to: '/batchprovisioning',
                            icon: 'fas fa-users-cog',
                            permission: ['admin', 'reseller', 'ccareadmin']
                        }
                    ]
                },
                {
                    label: this.$t('Monitoring & Statistics'),
                    icon: 'fas fa-chart-line',
                    permission: 'admin',
                    children: [
                        {
                            label: this.$t('System Statistics'),
                            to: '/grafana/d/system-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-chart-bar',
                            link: true,
                            permission: 'admin'
                        },
                        {
                            label: this.$t('SIP Statistics'),
                            to: '/grafana/d/sip-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-phone-alt',
                            link: true,
                            permission: 'admin'
                        },
                        {
                            label: this.$t('Database Statistics'),
                            to: '/grafana/d/database-statistics?ngcp_grafana_admin=no',
                            icon: 'fas fa-database',
                            link: true,
                            permission: 'admin'
                        },
                        {
                            label: this.$t('Cluster Overview'),
                            to: '/grafana/d/cluster-overview?ngcp_grafana_admin=no',
                            icon: 'device_hub',
                            link: true,
                            permission: 'admin'
                        },
                        {
                            label: this.$t('SIP Call Flows'),
                            icon: 'fas fa-exchange-alt',
                            to: '/callflow',
                            permission: ['admin']
                        },
                        {
                            label: this.$t('Statistics Administration'),
                            to: '/grafana/?ngcp_grafana_admin=yes',
                            icon: 'fas fa-cog',
                            link: true,
                            permission: 'admin'
                        }
                    ]
                },
                {
                    label: this.$t('Documentation'),
                    icon: 'fas fa-question-circle',
                    permission: '*',
                    children: [
                        {
                            label: this.$t('API'),
                            to: '/api/',
                            icon: 'fas fa-file-alt',
                            link: true,
                            permission: ['admin', 'reseller']
                        },
                        {
                            label: this.$t('Handbook'),
                            to: '/handbook/',
                            icon: 'fas fa-book',
                            link: true,
                            permission: ['admin', 'reseller', 'ccare', 'lintercept', 'ccareadmin']
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
