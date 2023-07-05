import {
    getProxyRewriteFor, getToken,
    PATH_ERROR_403,
    PATH_LOGIN,
    PATH_RECOVER_PASSWORD, proxyRewriteGrafanaBase
} from 'src/router/common'
import {
    i18n
} from 'boot/i18n'

import adminRoutes from './module-routes/admin'
import resellerRoutes from './module-routes/reseller'
import customerRoutes from './module-routes/customer'
import contractRoutes from './module-routes/contract'
import contactRoutes from './module-routes/contact'
import domainRoutes from './module-routes/domain'
import subscriberRoutes from './module-routes/subscriber'
import subscriberProfileRoutes from './module-routes/subscriber-profile'
import callListSuppressionRoutes from './module-routes/call-list-suppression'
import billingProfileRoutes from './module-routes/billing-profile'
import billingNetworkRoutes from './module-routes/billing-network'
import billingPackageRoutes from './module-routes/billing-package'
import invoiceTemplateRoutes from './module-routes/invoice-template'
import invoiceRoutes from './module-routes/invoice'
import voucherRoutes from './module-routes/voucher'
import peeringRoutes from './module-routes/peering'
import rewriteRuleRoutes from './module-routes/rewrite-rule'
import headerRuleRoutes from './module-routes/header-rule'
import ncosLevelRoutes from './module-routes/ncos-level'
import soundSetRoutes from './module-routes/sound-set'
import emailTemplateRoutes from './module-routes/email-template'
import deviceRoutes from './module-routes/device'
import securityBanRoutes from './module-routes/security-ban'
import maliciousCallRoutes from './module-routes/malicious-call'
import lnpCarrierRoutes from './module-routes/lnp-carrier'
import emergencyMappingRoutes from './module-routes/emergency-mapping'
import phonebookEntryRoutes from './module-routes/phonebook-entry'
import timeSetRoutes from './module-routes/time-set'
import ncosSetsRoutes from './module-routes/ncos-sets'

const routes = [
    {
        name: 'root',
        path: '/',
        component: () => import('layouts/MainLayout'),
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                component: () => import('pages/AuiDashboardPage'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.dashboard'
                    },
                    get label () {
                        return i18n.global.tc('Dashboard')
                    },
                    icon: 'fas fa-tachometer-alt'
                }
            },
            ...adminRoutes,
            ...resellerRoutes,
            ...customerRoutes,
            ...contractRoutes,
            ...contactRoutes,
            ...domainRoutes,
            ...subscriberRoutes,
            ...subscriberProfileRoutes,
            ...callListSuppressionRoutes,
            ...billingProfileRoutes,
            ...billingNetworkRoutes,
            ...billingPackageRoutes,
            ...invoiceTemplateRoutes,
            ...invoiceRoutes,
            ...voucherRoutes,
            ...peeringRoutes,
            ...rewriteRuleRoutes,
            ...headerRuleRoutes,
            ...ncosLevelRoutes,
            ...soundSetRoutes,
            ...emailTemplateRoutes,
            ...deviceRoutes,
            ...securityBanRoutes,
            ...maliciousCallRoutes,
            ...lnpCarrierRoutes,
            ...emergencyMappingRoutes,
            ...phonebookEntryRoutes,
            ...timeSetRoutes,
            ...ncosSetsRoutes,
            {
                name: 'callRoutingVerifyList',
                path: '/callroutingverify',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.callroutingverify'
                    },
                    get label () {
                        return i18n.global.tc('Call Routing Verification')
                    },
                    icon: 'fas fa-tty',
                    proxy: true
                }
            },
            {
                name: 'callRoutingVerifyCatchAll',
                path: '/callroutingverify/:pathMatch(.*)',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.callroutingverify'
                    },
                    proxy: true
                }
            },
            {
                name: 'peeringOverviewList',
                path: '/peeringoverview',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.peeringoverview'
                    },
                    get label () {
                        return i18n.global.tc('Peering Overview')
                    },
                    icon: 'fas fa-binoculars',
                    proxy: true
                }
            },
            {
                name: 'peeringOverviewCatchAll',
                path: '/peeringoverview/:pathMatch(.*)',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.peeringoverview'
                    },
                    proxy: true
                }
            },
            {
                name: 'batchProvisioningList',
                path: '/batchprovisioning',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.batchprovisioning'
                    },
                    get label () {
                        return i18n.global.tc('Batch Provisioning')
                    },
                    icon: 'fas fa-users-cog',
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningCreate',
                path: '/batchprovisioning/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningTemplatesForm',
                path: '/batchprovisioning/templates/:id/form',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningTemplatesUpload',
                path: '/batchprovisioning/templates/:id/upload',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningCatchAll',
                path: '/batchprovisioning/:pathMatch(.*)',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'systemStatistics',
                path: '/system-statistics',
                component: () => import('pages/statistics/AuiSystemStatistics'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemstatistics'
                    },
                    get label () {
                        return i18n.global.tc('System Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/system-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'processStatistics',
                path: '/system-processes',
                component: () => import('pages/statistics/AuiSystemProcesses'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemprocesses'
                    },
                    get label () {
                        return i18n.global.tc('System Processes')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true
                }
            },
            {
                name: 'rtpStatistics',
                path: '/rtp-statistics',
                component: () => import('pages/statistics/AuiMediaRelayDashboard'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.rtpstatistics'
                    },
                    get label () {
                        return i18n.global.tc('RTP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true
                }
            },
            {
                name: 'sipStatistics',
                path: '/sip-statistics',
                component: () => import('pages/statistics/AuiSipStatistics'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipstatistics'
                    },
                    get label () {
                        return i18n.global.tc('SIP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/sip-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'databaseStatistics',
                path: '/database-statistics',
                component: () => import('pages/statistics/AuiDatabaseDashboard'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.databasestatistics'
                    },
                    get label () {
                        return i18n.global.tc('Database Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true
                }
            },
            {
                name: 'keydbStatistics',
                path: '/keydb-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.keydbstatistics'
                    },
                    get label () {
                        return i18n.global.tc('KeyDB Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/keydb-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'victoriametricsStatistics',
                path: '/victoriametrics',
                component: () => import('pages/statistics/AuiVictoriaMetrics'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.victoriametricsstatistics'
                    },
                    get label () {
                        return i18n.global.tc('VictoriaMetrics Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true
                }
            },
            {
                name: 'kamStatistics',
                path: '/kam-statistics',
                component: () => import('pages/statistics/AuiKamailioMemory'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.kamstatistics'
                    },
                    get label () {
                        return i18n.global.tc('Kamailio Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true
                }
            },
            {
                name: 'clusterOverview',
                path: '/cluster-overview',
                component: () => import('pages/statistics/AuiClusterOverview'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.clusteroverview'
                    },
                    get label () {
                        return i18n.global.tc('Cluster Overview')
                    },
                    icon: 'device_hub',
                    proxy: true
                }
            },
            {
                name: 'sipCallFlowList',
                path: '/callflow',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipcallflows'
                    },
                    get label () {
                        return i18n.global.tc('SIP Call Flows')
                    },
                    icon: 'fas fa-exchange-alt',
                    proxy: true,
                    platformInfo: 'callflow'
                }
            },
            {
                name: 'sipCallFlowCatchAll',
                path: '/callflow/:pathMatch(.*)',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'statistic.sipcallflows'
                    },
                    proxy: true
                }
            },
            {
                name: 'statisticsAdministration',
                path: '/statistics-administration',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.statisticsadministration'
                    },
                    get label () {
                        return i18n.global.tc('Statistics Administration')
                    },
                    icon: 'fas fa-cog',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/?ngcp_grafana_admin=yes')
                }
            },
            {
                name: 'apiDoc',
                path: '/api-doc',
                beforeEnter () {
                    document.location.href = '/api/'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'doc.api'
                    },
                    get label () {
                        return i18n.global.tc('API')
                    },
                    icon: 'fas fa-file-alt',
                    openNewWindow: true
                }
            },
            {
                name: 'handbook',
                path: '/handbook',
                beforeEnter () {
                    document.location.href = '/handbook/'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'doc.handbook'
                    },
                    get label () {
                        return i18n.global.tc('Handbook')
                    },
                    icon: 'fas fa-book',
                    openNewWindow: true
                }
            },
            {
                name: 'links',
                path: '/links',
                component: () => import('pages/links/AuiLinksList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'doc.links'
                    },
                    get label () {
                        return i18n.global.tc('Links')
                    },
                    icon: 'fas fa-external-link-alt'
                }
            },
            {
                name: 'proxyGrafana',
                path: '/grafana/:pathMatch(.*)',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true,
                    proxyRewrite: proxyRewriteGrafanaBase
                }
            },
            {
                name: 'ngcpVersionStatistics',
                path: '/statistics/versions',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true
                }
            },
            {
                name: 'ngcpVersionStatisticsSupport',
                path: '/statistics/supportstatus',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true
                }
            },
            {
                name: 'proxyReflection',
                path: '/proxy/:pathMatch(.*)',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true,
                    proxyReverseInvisible: true,
                    proxyRewrite ({ route, url }) {
                        url.pathname = route.path.replace('/proxy', '')
                        return url
                    }
                }
            }
        ]
    },
    {
        path: '',
        component: () => import('layouts/LoginLayout'),
        children: [
            {
                name: 'login',
                path: PATH_LOGIN,
                component: () => import('pages/Login'),
                meta: {
                    get label () {
                        return i18n.global.tc('Login')
                    }
                }
            },
            {
                name: 'passwordRecovery',
                path: PATH_RECOVER_PASSWORD,
                component: () => import('pages/RecoverPassword'),
                props: getToken
            },
            {
                name: 'error403',
                path: PATH_ERROR_403,
                component: () => import('pages/AuiPageError403'),
                meta: {
                    get label () {
                        return i18n.global.tc('Forbidden')
                    }
                }
            },
            ...(process.env.MODE !== 'ssr'
                ? [
                    {
                        name: 'error404',
                        path: '*',
                        component: () => import('pages/AuiPageError404'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Page not found')
                            }
                        }
                    }
                ]
                : []
            )
        ]
    }
]

export default routes
