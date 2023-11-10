import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'billingProfileList',
        path: '/billing',
        component: () => import('pages/billing-profiles/AuiBillingProfileList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.global.tc('Billing Profiles')
            },
            icon: 'fas fa-hand-holding-usd',
            root: true,
            journalRouteName: 'billingProfileJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'billingProfileJournalAdvanced',
        path: '/billing/journal',
        resource: 'billingprofiles',
        parentPath: 'billingProfileList'
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
                return i18n.global.tc('Add')
            },
            icon: 'add',
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
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'billingProfileList'
        },
        children: [
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
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingProfileDuplicate',
                path: 'duplicate',
                component: () => import('pages/Proxy'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.global.tc('Duplicate')
                    },
                    icon: 'content_copy',
                    proxy: true,
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
                        return i18n.global.tc('Zones')
                    },
                    icon: 'fas fa-funnel-dollar',
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
                        return i18n.global.tc('Add')
                    },
                    icon: 'add',
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
                        return '#' + resourceObject.id + ' - ' + resourceObject.zone
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
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
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
                        return i18n.global.tc('Fees')
                    },
                    icon: 'fas fa-shopping-cart',
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
                        return i18n.global.tc('Add')
                    },
                    icon: 'add',
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileFees'
                }
            },
            {
                name: 'billingFeeUpload',
                path: 'fees/upload',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingfees'
                    },
                    get label () {
                        return i18n.global.tc('Add')
                    },
                    icon: 'add',
                    proxy: true,
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
                        return '#' + resourceObject.id + resourceObject.destination
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
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
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
                        return i18n.global.tc('Off-peaktimes')
                    },
                    icon: 'fas fa-clock',
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
                        return i18n.global.tc('Create Off-Peak Date')
                    },
                    icon: 'add',
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
                            return i18n.global.tc('Monday')
                        case 1:
                            return i18n.global.tc('Tuesday')
                        case 2:
                            return i18n.global.tc('Wednesday')
                        case 3:
                            return i18n.global.tc('Thursday')
                        case 4:
                            return i18n.global.tc('Friday')
                        case 5:
                            return i18n.global.tc('Saturday')
                        case 6:
                            return i18n.global.tc('Sunday')
                        }
                    },
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
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
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
