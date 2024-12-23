import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import {
    PATH_ERROR_403,
    PATH_LOGIN,
    PATH_RECOVER_PASSWORD,
    getProxyRewriteFor,
    getToken,
    proxyRewriteGrafanaBase
} from 'src/router/common'

import adminRoutes from 'src/router/module-routes/admin'
import billingNetworkRoutes from 'src/router/module-routes/billing-network'
import billingPackageRoutes from 'src/router/module-routes/billing-package'
import billingProfileRoutes from 'src/router/module-routes/billing-profile'
import callListSuppressionRoutes from 'src/router/module-routes/call-list-suppression'
import contactRoutes from 'src/router/module-routes/contact'
import contractRoutes from 'src/router/module-routes/contract'
import customerRoutes from 'src/router/module-routes/customer'
import deviceRoutes from 'src/router/module-routes/device'
import domainRoutes from 'src/router/module-routes/domain'
import emailTemplateRoutes from 'src/router/module-routes/email-template'
import emergencyMappingRoutes from 'src/router/module-routes/emergency-mapping'
import headerManipulationsRoutes from 'src/router/module-routes/header-manipulations'
import invoiceRoutes from 'src/router/module-routes/invoice'
import invoiceTemplateRoutes from 'src/router/module-routes/invoice-template'
import lnpCarrierRoutes from 'src/router/module-routes/lnp-carrier'
import maliciousCallRoutes from 'src/router/module-routes/malicious-call'
import ncosLevelRoutes from 'src/router/module-routes/ncos-level'
import ncosSetsRoutes from 'src/router/module-routes/ncos-sets'
import peeringRoutes from 'src/router/module-routes/peering'
import phonebookEntryRoutes from 'src/router/module-routes/phonebook-entry'
import resellerRoutes from 'src/router/module-routes/reseller'
import rewriteRuleRoutes from 'src/router/module-routes/rewrite-rule'
import securityBanRoutes from 'src/router/module-routes/security-ban'
import soundSetRoutes from 'src/router/module-routes/sound-set'
import subscriberRoutes from 'src/router/module-routes/subscriber'
import subscriberProfileRoutes from 'src/router/module-routes/subscriber-profile'
import timeSetRoutes from 'src/router/module-routes/time-set'
import voucherRoutes from 'src/router/module-routes/voucher'

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
                        return i18n.global.t('Dashboard')
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
            ...headerManipulationsRoutes,
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
                        return i18n.global.t('Call Routing Verification')
                    },
                    icon: 'fas fa-tty',
                    proxy: true,
                    root: true
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
                        return i18n.global.t('Peering Overview')
                    },
                    icon: 'fas fa-binoculars',
                    proxy: true,
                    root: true
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
                        return i18n.global.t('Batch Provisioning')
                    },
                    icon: 'fas fa-users-cog',
                    licenses: [LICENSES.batch_provisioning],
                    proxy: true,
                    root: true,
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
                    licenses: [LICENSES.batch_provisioning],
                    proxy: true,
                    root: true,
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
                    licenses: [LICENSES.batch_provisioning],
                    proxy: true,
                    root: true,
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
                    licenses: [LICENSES.batch_provisioning],
                    proxy: true,
                    root: true,
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
                    licenses: [LICENSES.batch_provisioning],
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'licenseStatus',
                path: '/license-status',
                component: () => import('src/pages/AuiLicenseStatusPage'),
                meta: {
                    get label () {
                        return i18n.global.t('License Status')
                    },
                    icon: 'fas fa-chart-bar',
                    root: true
                }
            },
            {
                name: 'licenseStatusCatchAll',
                path: '/license-status/:pathMatch(.*)',
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
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemstatistics'
                    },
                    get label () {
                        return i18n.global.t('System Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/system-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'processStatistics',
                path: '/system-processes',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemprocesses'
                    },
                    get label () {
                        return i18n.global.t('System Processes')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/system-processes?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'rtpStatistics',
                path: '/rtp-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.rtpstatistics'
                    },
                    get label () {
                        return i18n.global.t('RTP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/rtp-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'sipStatistics',
                path: '/sip-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipstatistics'
                    },
                    get label () {
                        return i18n.global.t('SIP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/sip-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'databaseStatistics',
                path: '/database-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.databasestatistics'
                    },
                    get label () {
                        return i18n.global.t('Database Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/database-statistics?ngcp_grafana_admin=no')
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
                        return i18n.global.t('KeyDB Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/keydb-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'victoriametricsStatistics',
                path: '/victoriametrics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.victoriametricsstatistics'
                    },
                    get label () {
                        return i18n.global.t('VictoriaMetrics Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/victoriametrics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'kamStatistics',
                path: '/kam-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.kamstatistics'
                    },
                    get label () {
                        return i18n.global.t('Kamailio Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/kam-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'websocketStatistics',
                path: '/websocket-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.websocket'
                    },
                    get label () {
                        return i18n.global.t('Websocket Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/websocket-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'clusterOverview',
                path: '/cluster-overview',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.clusteroverview'
                    },
                    get label () {
                        return i18n.global.t('Cluster Overview')
                    },
                    icon: 'device_hub',
                    proxy: true,
                    root: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/cluster-overview?ngcp_grafana_admin=no')
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
                        return i18n.global.t('SIP Call Flows')
                    },
                    icon: 'fas fa-exchange-alt',
                    proxy: true,
                    root: true,
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
                        return i18n.global.t('Statistics Administration')
                    },
                    icon: 'fas fa-cog',
                    proxy: true,
                    root: true,
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
                        return i18n.global.t('API')
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
                        return i18n.global.t('Handbook')
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
                        return i18n.global.t('Links')
                    },
                    icon: 'fas fa-external-link-alt',
                    root: true
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
                        return i18n.global.t('Login')
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
                        return i18n.global.t('Forbidden')
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
                                return i18n.global.t('Page not found')
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
