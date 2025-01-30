import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

export default [
    {
        name: 'billingProfileList',
        path: '/billing',
        component: () => import('pages/billing-profiles/AuiBillingProfilesList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.global.t('Billing Profiles')
            },
            icon: 'fas fa-hand-holding-usd',
            licenses: [LICENSES.billing],
            root: true,
            journalRouteName: 'billingProfileJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'billingProfileJournalAdvanced',
        path: '/billing/journal',
        resource: 'billingprofiles',
        parentPath: 'billingProfileList',
        licenses: [LICENSES.billing]
    }),
    {
        name: 'billingProfileCreation',
        path: '/billing/create',
        component: () => import('pages/billing-profiles/AuiBillingProfileCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            licenses: [LICENSES.billing],
            parentPath: 'billingProfileList'
        }
    },
    {
        name: 'billingProfileContext',
        path: '/billing/:id',
        redirect: (to) => {
            return {
                name: 'billingProfileEdit',
                params: to.params
            }
        },
        component: () => import('pages/billing-profiles/AuiBillingProfileContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingprofiles'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'billingProfileList'
        },
        children: [
            createJournalRoute({
                name: 'billingProfilesJournal',
                resource: 'billingprofiles',
                parentPath: 'billingProfileList.billingProfileContext'
            }),
            {
                name: 'billingProfileEdit',
                path: 'edit',
                component: () => import('pages/billing-profiles/AuiBillingProfileEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingProfileDuplicate',
                path: 'duplicate',
                component: () => import('pages/billing-profiles/AuiBillingProfileDuplicate'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.global.t('Duplicate')
                    },
                    icon: 'content_copy',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingProfileZones',
                path: 'zones',
                component: () => import('pages/billing-profiles/AuiBillingZonesList'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingzones'
                    },
                    get label () {
                        return i18n.global.t('Zones')
                    },
                    icon: 'fas fa-funnel-dollar',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingZoneCreation',
                path: 'zones/create',
                component: () => import('pages/billing-profiles/AuiBillingZonesCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingzones'
                    },
                    get label () {
                        return i18n.global.t('Add')
                    },
                    icon: 'add',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext'
                }
            },
            {
                name: 'billingZoneContext',
                path: 'zones/:zonesId',
                redirect: (to) => {
                    return { name: 'billingZoneEdit', params: to.params }
                },
                component: () => import('pages/billing-profiles/AuiBillingZonesContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.billingzones'
                    },
                    dataContext: true,
                    contextLabel: ({ resourceObject }) => {
                        return `#${resourceObject.id} - ${resourceObject.zone}`
                    },
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileZones'
                },
                children: [
                    {
                        name: 'billingZoneEdit',
                        path: 'edit',
                        component: () => import('pages/billing-profiles/AuiBillingZonesEdit'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.billingzones'
                            },
                            get label () {
                                return i18n.global.t('Edit')
                            },
                            icon: 'edit',
                            licenses: [LICENSES.billing],
                            parentPath: 'billingProfileList.billingProfileContext.billingProfileZones.billingZoneContext',
                            menu: true
                        }
                    }
                ]
            },
            {
                name: 'billingProfileFees',
                path: 'fees',
                component: () => import('pages/billing-profiles/AuiBillingFeesList'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingfees'
                    },
                    get label () {
                        return i18n.global.t('Fees')
                    },
                    icon: 'fas fa-shopping-cart',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingFeeCreation',
                path: 'fees/create',
                component: () => import('pages/billing-profiles/AuiBillingFeesCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingfees'
                    },
                    get label () {
                        return i18n.global.t('Add')
                    },
                    icon: 'add',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileFees'
                }
            },
            {
                name: 'billingFeeUpload',
                path: 'fees/upload',
                component: () => import('pages/billing-profiles/AuiBillingFeesUpload'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingfees'
                    },
                    get label () {
                        return i18n.global.t('Add')
                    },
                    icon: 'add',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileFees'
                }
            },
            {
                name: 'billingFeeContext',
                path: 'fees/:billingFeeId',
                redirect: (to) => {
                    return {
                        name: 'billingFeeEdit',
                        params: to.params
                    }
                },
                component: () => import('pages/billing-profiles/AuiBillingFeeContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.billingfees'
                    },
                    contextRoot: true,
                    contextLabel: ({ resourceObject }) => {
                        return `#${resourceObject.id}${resourceObject.destination}`
                    },
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileFees'
                },
                children: [
                    {
                        name: 'billingFeeEdit',
                        path: 'edit',
                        component: () => import('pages/billing-profiles/AuiBillingFeesEdit'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.billingfees'
                            },
                            get label () {
                                return i18n.global.t('Edit')
                            },
                            icon: 'edit',
                            licenses: [LICENSES.billing],
                            parentPath: 'billingProfileList.billingProfileContext.billingProfileFees.billingFeeContext',
                            menu: true
                        }
                    }
                ]
            },
            {
                name: 'billingProfilePeaktimes',
                path: 'peaktimes',
                component: () => import('pages/Proxy'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.global.t('Off-peaktimes')
                    },
                    icon: 'fas fa-clock',
                    licenses: [LICENSES.billing],
                    proxy: true,
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingProfilePeaktimesDateCreation',
                path: 'peaktimes/date/create',
                component: () => import('pages/Proxy'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.global.t('Create Off-Peak Date')
                    },
                    icon: 'add',
                    licenses: [LICENSES.billing],
                    proxy: true,
                    parentPath: 'billingProfileList.billingProfileContext.billingProfilePeaktimes'
                }
            },
            {
                name: 'billingProfilePeaktimesWeekdayContext',
                path: 'peaktimes/weekday/:peekTimesWeekday',
                redirect: (to) => {
                    return {
                        name: 'billingProfilePeaktimesWeekday',
                        params: to.params
                    }
                },
                component: () => import('pages/billing-profiles/AuiBillingProfileOffPeakTimeContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    contextRoot: true,
                    contextStatic: true,
                    contextLabel: ({ currentRoute }) => {
                        switch (Number(currentRoute.params.peekTimesWeekday)) {
                        case 0:
                            return i18n.global.t('Monday')
                        case 1:
                            return i18n.global.t('Tuesday')
                        case 2:
                            return i18n.global.t('Wednesday')
                        case 3:
                            return i18n.global.t('Thursday')
                        case 4:
                            return i18n.global.t('Friday')
                        case 5:
                            return i18n.global.t('Saturday')
                        case 6:
                            return i18n.global.t('Sunday')
                        }
                    },
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfileList.billingProfileContext.billingProfilePeaktimes'
                },
                children: [
                    {
                        name: 'billingProfilePeaktimesWeekday',
                        path: 'edit',
                        component: () => import('pages/Proxy'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.billingprofiles'
                            },
                            get label () {
                                return i18n.global.t('Edit')
                            },
                            icon: 'edit',
                            licenses: [LICENSES.billing],
                            proxy: true,
                            parentPath: 'billingProfileList.billingProfileContext.billingProfilePeaktimes.billingProfilePeaktimesWeekdayContext'
                        }
                    }
                ]
            }
        ]
    },
    {
        name: 'billingProfileCatchAll',
        path: '/billing/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingprofiles'
            },
            proxy: true
        }
    }
]
