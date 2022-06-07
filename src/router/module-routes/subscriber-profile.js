import { i18n } from 'boot/i18n'

export default [
    {
        name: 'subscriberProfileSetList',
        path: '/subscriberprofile',
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscriberprofilesets'
            },
            get label () {
                return i18n.t('Subscriber Profiles')
            },
            icon: 'far fa-user',
            root: true
        }
    },
    {
        name: 'subscriberProfileSetCreate',
        path: '/subscriberprofile/create',
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.subscriberprofilesets'
            },
            get label () {
                return i18n.t('Create Subscriber Profile Set')
            },
            icon: 'add',
            parentPath: 'subscriberProfileSetList'
        }
    },
    {
        name: 'subscriberProfileSetContext',
        path: '/subscriberprofile/:id',
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscriberprofilesets'
            },
            contextRoot: true,
            parentPath: 'subscriberProfileSetList'
        },
        children: [{
            name: 'subscriberProfileSetEdit',
            path: '/subscriberprofile/:id/edit',
            component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetEdit'),
            meta: {
                $p: {
                    operation: 'update',
                    resource: 'entity.subscriberprofilesets'
                },
                get label () {
                    return i18n.t('Edit')
                },
                icon: 'edit',
                parentPath: 'subscriberProfileSetList.subscriberProfileSetContext'
            }
        },
        {
            name: 'subscriberProfileSetClone',
            path: '/subscriberprofile/:id/clone',
            component: () => import('pages/Proxy'),
            meta: {
                $p: {
                    operation: 'update',
                    resource: 'entity.subscriberprofilesets'
                },
                get label () {
                    return i18n.t('Clone')
                },
                icon: 'content_copy',
                parentPath: 'subscriberProfileSetList.subscriberProfileSetContext',
                proxy: true
            }
        }]
    },
    {
        name: 'subscriberProfilesList',
        path: '/subscriberprofile/:id/profile',
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesList'),
        props: route => ({ profileSetId: Number(route.params.id) }),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscriberprofilesets'
            },
            get label () {
                return i18n.t('Profiles')
            },
            icon: 'list',
            root: true
        }
    },
    {
        name: 'subscriberProfilesContext',
        path: '/subscriberprofile/:profileSetId/profile/:id',
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscriberprofilesets'
            },
            contextRoot: true,
            parentPath: 'subscriberProfilesList'
        },
        children: [{
            name: 'subscriberProfilesEdit',
            path: 'edit',
            component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesEdit'),
            props: route => ({ profileSetId: Number(route.params.profileSetId) }),
            meta: {
                $p: {
                    operation: 'update',
                    resource: 'entity.subscriberprofilesets'
                },
                get label () {
                    return i18n.t('Edit')
                },
                icon: 'edit',
                parentPath: 'subscriberProfilesList.subscriberProfilesContext'
            }
        },
        {
            name: 'subscriberProfilesClone',
            path: 'clone',
            component: () => import('pages/Proxy'),
            meta: {
                $p: {
                    operation: 'update',
                    resource: 'entity.subscriberprofilesets'
                },
                get label () {
                    return i18n.t('Clone')
                },
                icon: 'content_copy',
                parentPath: 'subscriberProfilesList.subscriberProfilesContext',
                proxy: true
            }
        },
        {
            name: 'subscriberProfilesPreferences',
            path: 'preferences',
            component: () => import('pages/Proxy'),
            meta: {
                $p: {
                    operation: 'update',
                    resource: 'entity.subscriberprofilesets'
                },
                get label () {
                    return i18n.t('Preferences')
                },
                icon: 'settings_applications',
                parentPath: 'subscriberProfilesList.subscriberProfilesContext',
                proxy: true
            }
        }]
    },
    {
        name: 'subscriberProfilesCreate',
        path: '/subscriberprofile/:id/profile/create',
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesCreation'),
        props: route => ({ profileSetId: Number(route.params.id) }),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.subscriberprofilesets'
            },
            get label () {
                return i18n.t('Add')
            },
            icon: 'add',
            parentPath: 'subscriberProfilesList'
        }
    },
    {
        name: 'subscriberProfileSetCatchAll',
        path: '/subscriberprofile/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.subscriberprofilesets'
            },
            proxy: true
        }
    }
]
