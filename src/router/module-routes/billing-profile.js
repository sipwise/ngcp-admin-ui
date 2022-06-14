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
                return i18n.t('Billing Profiles')
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
                return i18n.t('Add')
            },
            icon: 'add',
            proxy: true,
            parentPath: 'billingProfileList'
        }
    },
    {
        name: 'billingProfileContext',
        path: '/billing/:billingProfileId',
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
                component: () => import('pages/Proxy'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    proxy: true,
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
                        return i18n.t('Duplicate')
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
                component: () => import('pages/Proxy'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingzones'
                    },
                    get label () {
                        return i18n.t('Zones')
                    },
                    icon: 'fas fa-funnel-dollar',
                    proxy: true,
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingZoneCreation',
                path: 'zones/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingzones'
                    },
                    get label () {
                        return i18n.t('Add')
                    },
                    icon: 'add',
                    proxy: true,
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileZones'
                }
            },
            {
                name: 'billingProfileFees',
                path: 'fees',
                component: () => import('pages/Proxy'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingfees'
                    },
                    get label () {
                        return i18n.t('Fees')
                    },
                    icon: 'fas fa-shopping-cart',
                    proxy: true,
                    parentPath: 'billingProfileList.billingProfileContext',
                    menu: true
                }
            },
            {
                name: 'billingFeeCreation',
                path: 'fees/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingfees'
                    },
                    get label () {
                        return i18n.t('Add')
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
                        return '#' + resourceObject.id
                    },
                    parentPath: 'billingProfileList.billingProfileContext.billingProfileFees'
                },
                children: [
                    {
                        name: 'billingFeeEdit',
                        path: 'edit',
                        component: () => import('pages/Proxy'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.billingfees'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            proxy: true,
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
                        return i18n.t('Off-peaktimes')
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
                        return i18n.t('Create Off-Peak Date')
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
                            return i18n.t('Monday')
                        case 1:
                            return i18n.t('Tuesday')
                        case 2:
                            return i18n.t('Wednesday')
                        case 3:
                            return i18n.t('Thursday')
                        case 4:
                            return i18n.t('Friday')
                        case 5:
                            return i18n.t('Saturday')
                        case 6:
                            return i18n.t('Sunday')
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
                                return i18n.t('Edit')
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
        path: '/billing/*',
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
