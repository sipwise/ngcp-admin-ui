import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

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
                return i18n.t('Subscriber Profile Sets')
            },
            icon: 'far fa-user',
            root: true,
            journalRouteName: 'subscriberProfileSetJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'subscriberProfileSetJournalAdvanced',
        path: '/subscriberprofile/journal',
        resource: 'subscriberprofilesets',
        parentPath: 'subscriberProfileSetList'
    }),
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
                return i18n.t('Add')
            },
            icon: 'add',
            parentPath: 'subscriberProfileSetList'
        }
    },
    {
        name: 'subscriberProfileSetContext',
        path: '/subscriberprofile/:profileSetId',
        redirect: (to) => {
            return { name: 'subscriberProfileSetEdit', params: to.params }
        },
        component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscriberprofilesets'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'subscriberProfileSetList'
        },
        children: [
            {
                name: 'subscriberProfileSetEdit',
                path: 'edit',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetEdit'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofilesets'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'subscriberProfileSetList.subscriberProfileSetContext',
                    menu: true
                }
            },
            {
                name: 'subscriberProfileSetClone',
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
                    parentPath: 'subscriberProfileSetList.subscriberProfileSetContext',
                    proxy: true,
                    menu: true
                }
            },
            {
                name: 'subscriberProfileList',
                path: 'profile',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileList'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofiles'
                    },
                    get label () {
                        return i18n.t('Profiles')
                    },
                    icon: 'list',
                    parentPath: 'subscriberProfileSetList.subscriberProfileSetContext',
                    menu: true
                }
            },
            {
                name: 'subscriberProfileCreate',
                path: 'profile/create',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileCreation'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofilesets'
                    },
                    get label () {
                        return i18n.t('Add')
                    },
                    icon: 'add',
                    parentPath: 'subscriberProfileSetList.subscriberProfileSetContext'
                }
            },
            {
                name: 'subscriberProfileContext',
                path: 'profile/:profileId',
                redirect: (to) => {
                    return { name: 'subscriberProfileEdit', params: to.params }
                },
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofiles'
                    },
                    dataContext: true,
                    contextLabel: ({ resourceObject }) => {
                        return '#' + resourceObject.id + ' - ' + resourceObject.name
                    },
                    parentPath: 'subscriberProfileSetList.subscriberProfileSetContext'
                },
                children: [
                    {
                        name: 'subscriberProfileEdit',
                        path: 'edit',
                        component: () => import('pages/subscriber-profiles/AuiSubscriberProfileEdit'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscriberprofilesets'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberProfileSetList.subscriberProfileSetContext.subscriberProfileContext',
                            menu: true
                        }
                    },
                    {
                        name: 'subscriberProfileClone',
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
                            parentPath: 'subscriberProfileSetList.subscriberProfileSetContext.subscriberProfileContext',
                            proxy: true,
                            menu: true
                        }
                    },
                    {
                        name: 'subscriberProfilePreferences',
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
                            parentPath: 'subscriberProfileSetList.subscriberProfileSetContext.subscriberProfileContext',
                            proxy: true,
                            menu: true
                        }
                    }
                ]
            }
        ]
    },
    // {
    //     name: 'subscriberProfileSetContext',
    //     path: '/subscriberprofile/:id',
    //     component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetContext'),
    //     meta: {
    //         $p: {
    //             operation: 'read',
    //             resource: 'entity.subscriberprofilesets'
    //         },
    //         contextRoot: true,
    //         parentPath: 'subscriberProfileSetList'
    //     },
    //     children: [{
    //         name: 'subscriberProfileSetEdit',
    //         path: '/subscriberprofile/:id/edit',
    //         component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetEdit'),
    //         meta: {
    //             $p: {
    //                 operation: 'update',
    //                 resource: 'entity.subscriberprofilesets'
    //             },
    //             get label () {
    //                 return i18n.t('Edit')
    //             },
    //             icon: 'edit',
    //             parentPath: 'subscriberProfileSetList.subscriberProfileSetContext'
    //         }
    //     },
    //     {
    //         name: 'subscriberProfileSetClone',
    //         path: '/subscriberprofile/:id/clone',
    //         component: () => import('pages/Proxy'),
    //         meta: {
    //             $p: {
    //                 operation: 'update',
    //                 resource: 'entity.subscriberprofilesets'
    //             },
    //             get label () {
    //                 return i18n.t('Clone')
    //             },
    //             icon: 'content_copy',
    //             parentPath: 'subscriberProfileSetList.subscriberProfileSetContext',
    //             proxy: true
    //         }
    //     }]
    // },
    // {
    //     name: 'subscriberProfilesList',
    //     path: '/subscriberprofile/:id/profile',
    //     component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesList'),
    //     props: route => ({ profileSetId: Number(route.params.id) }),
    //     meta: {
    //         $p: {
    //             operation: 'read',
    //             resource: 'entity.subscriberprofilesets'
    //         },
    //         get label () {
    //             return i18n.t('Profiles')
    //         },
    //         icon: 'list',
    //         root: true
    //     }
    // },
    // {
    //     name: 'subscriberProfilesContext',
    //     path: '/subscriberprofile/:profileSetId/profile/:id',
    //     component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesContext'),
    //     meta: {
    //         $p: {
    //             operation: 'read',
    //             resource: 'entity.subscriberprofilesets'
    //         },
    //         contextRoot: true,
    //         parentPath: 'subscriberProfilesList'
    //     },
    //     children: [{
    //         name: 'subscriberProfilesEdit',
    //         path: 'edit',
    //         component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesEdit'),
    //         props: route => ({ profileSetId: Number(route.params.profileSetId) }),
    //         meta: {
    //             $p: {
    //                 operation: 'update',
    //                 resource: 'entity.subscriberprofilesets'
    //             },
    //             get label () {
    //                 return i18n.t('Edit')
    //             },
    //             icon: 'edit',
    //             parentPath: 'subscriberProfilesList.subscriberProfilesContext'
    //         }
    //     },
    //     {
    //         name: 'subscriberProfilesClone',
    //         path: 'clone',
    //         component: () => import('pages/Proxy'),
    //         meta: {
    //             $p: {
    //                 operation: 'update',
    //                 resource: 'entity.subscriberprofilesets'
    //             },
    //             get label () {
    //                 return i18n.t('Clone')
    //             },
    //             icon: 'content_copy',
    //             parentPath: 'subscriberProfilesList.subscriberProfilesContext',
    //             proxy: true
    //         }
    //     },
    //     {
    //         name: 'subscriberProfilesPreferences',
    //         path: 'preferences',
    //         component: () => import('pages/Proxy'),
    //         meta: {
    //             $p: {
    //                 operation: 'update',
    //                 resource: 'entity.subscriberprofilesets'
    //             },
    //             get label () {
    //                 return i18n.t('Preferences')
    //             },
    //             icon: 'settings_applications',
    //             parentPath: 'subscriberProfilesList.subscriberProfilesContext',
    //             proxy: true
    //         }
    //     }]
    // },
    // {
    //     name: 'subscriberProfilesCreate',
    //     path: '/subscriberprofile/:id/profile/create',
    //     component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesCreation'),
    //     props: route => ({ profileSetId: Number(route.params.id) }),
    //     meta: {
    //         $p: {
    //             operation: 'update',
    //             resource: 'entity.subscriberprofilesets'
    //         },
    //         get label () {
    //             return i18n.t('Add')
    //         },
    //         icon: 'add',
    //         parentPath: 'subscriberProfilesList'
    //     }
    // },
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
