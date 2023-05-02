import { i18n } from 'boot/i18n'
import {
    createAdvancedJournalRoute, createJournalRoute,
    detailsPagePathRewrite,
    detailsPageToPreferencesPagePathRewrite,
    subscriberCallDetailsPathRewrite
} from 'src/router/common'
import { PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

export default [
    {
        name: 'subscriberList',
        path: '/subscriber',
        component: () => import('pages/subscribers/AuiSubscriberList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscribers'
            },
            get label () {
                return i18n.global.tc('Subscribers')
            },
            icon: 'fas fa-user',
            root: true,
            journalRouteName: 'subscriberJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'subscriberJournalAdvanced',
        path: '/subscriber/journal',
        resource: 'subscribers',
        parentPath: 'subscriberList'
    }),
    {
        name: 'subscriberContext',
        path: '/subscriber/:id',
        redirect: '/subscriber/:id/details',
        component: () => import('pages/subscribers/AuiSubscriberContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscribers'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.username
            },
            parentPath: 'subscriberList'
        },
        children: [
            createJournalRoute({
                name: 'subscriberJournal',
                resource: 'subscribers',
                parentPath: 'subscriberList.subscriberContext'
            }),
            {
                name: 'subscriberDetails',
                path: 'details',
                component: () => import('pages/subscriber-details/AuiSubscriberDetailsPage'),
                props: {
                    detailsPageRouteName: 'subscriberDetails',
                    redirectToSubpageRoute: { name: 'subscriberDetailsMasterData' }
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.global.tc('Details')
                    },
                    icon: 'article',
                    parentPath: 'subscriberList.subscriberContext',
                    menu: true,
                    goToPathRewrite: detailsPagePathRewrite
                },
                children: [
                    {
                        name: 'subscriberEdit',
                        path: 'edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsMasterDataEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsMasterData',
                            icon: 'edit',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsMasterData',
                        path: 'master-data',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsMasterData'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Master Data')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-user-edit',
                            v1DetailsPageSectionId: 'collapse_master'
                        }
                    },
                    {
                        name: 'subscriberDetailsGroups',
                        path: 'groups',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            get label () {
                                return i18n.global.tc('PBX Groups')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-user-friends',
                            customerType: 'pbxaccount',
                            subscriberType: 'pbx-seat',
                            v1DetailsPageSectionId: 'collapse_pbx_group_items',
                            proxy: true,
                            proxyRewrite: detailsPagePathRewrite,
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'subscriberDetailsGroupMembers',
                        path: 'group-members',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            get label () {
                                return i18n.global.tc('PBX Group members')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-user-friends',
                            customerType: 'pbxaccount',
                            subscriberType: 'pbx-group',
                            v1DetailsPageSectionId: 'collapse_pbx_group_items',
                            proxy: true,
                            proxyRewrite: detailsPagePathRewrite,
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'subscriberDetailsVoicemails',
                        path: 'voicemails',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsVoicemails'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Voicemails')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'voicemail',
                            v1DetailsPageSectionId: 'collapse_voicemail'
                        }
                    },
                    {
                        name: 'subscriberDetailsCallRecordings',
                        path: 'call-recordings',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallRecordings'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Call Recordings')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'play_circle',
                            v1DetailsPageSectionId: 'collapse_recordings'
                        }
                    },
                    {
                        name: 'subscriberDetailsCallDetails',
                        path: 'call-details/:callId',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Call details')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'search',
                            proxy: true,
                            hideFromPageMenu: true,
                            proxyRewrite: subscriberCallDetailsPathRewrite,
                            goToPathRewrite: subscriberCallDetailsPathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsRecordedFiles',
                        path: '/subscriber/:id/details/recording/:recordingId/streams',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Recorded files')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'play_arrow',
                            proxy: true,
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsRegisteredDevices',
                        path: 'registered-devices',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsRegisteredDevices'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Registered Devices')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'devices',
                            v1DetailsPageSectionId: 'collapse_regdev'
                        }
                    },
                    {
                        name: 'subscriberDetailsRegisteredDeviceCreation',
                        path: 'registered/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsRegisteredDevicesCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsRegisteredDevices',
                            icon: 'add',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsCapturedDialogs',
                        path: 'captured-dialogs',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCapturedDialogs'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Captured Dialogs')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'sync_alt',
                            v1DetailsPageSectionId: 'collapse_cap',
                            goToPathRewrite: detailsPagePathRewrite,
                            platformInfo: 'callflow'
                        }
                    },
                    {
                        name: 'subscriberDetailsCallMap',
                        path: '/subscriber/:id/callflow/:callId/callmap',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Call map')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'sip',
                            proxy: true,
                            hideFromPageMenu: true,
                            platformInfo: 'callflow'
                        }
                    },
                    {
                        name: 'subscriberDetailsPhonebook',
                        path: 'phonebook',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebook'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Phonebook')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-address-book',
                            v1DetailsPageSectionId: 'collapse_phonebook',
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsPhonebookEntryCreation',
                        path: '/subscriber/:id/details/phonebook/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebookCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsPhonebook',
                            icon: 'add',
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsPhonebookEntryEdit',
                        path: '/subscriber/:id/details/phonebook/:phonebookId/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebookEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.phonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsPhonebook',
                            icon: 'edit',
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsPhonebookEntryUploadCSV',
                        path: '/subscriber/:id/details/phonebook_upload_csv',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.phonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Upload CSV')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsPhonebook',
                            icon: 'fas fa-upload',
                            proxy: true,
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsCallForwarding',
                        path: 'call-forwarding',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Call Forwarding')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'phone_forwarded',
                            v1DetailsPageSectionId: 'collapse_cf',
                            proxy: true,
                            proxyRewrite: detailsPageToPreferencesPagePathRewrite,
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsVoicemailSettings',
                        path: 'voicemail',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsVoicemailSettings'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Voicemail Settings')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'record_voice_over',
                            v1DetailsPageSectionId: 'collapse_vm',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsFax',
                        path: 'fax',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsFaxSettings'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Fax Features')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fax',
                            v1DetailsPageSectionId: 'collapse_fax',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsAutoAttendant',
                        path: 'auto-attendant',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Auto Attendant Slots')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'dialpad',
                            v1DetailsPageSectionId: 'collapse_aa',
                            proxy: true,
                            proxyRewrite: detailsPageToPreferencesPagePathRewrite,
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            customerType: 'pbxaccount',
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'subscriberDetailsSpeedDial',
                        path: 'speed-dial',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsSpeedDial'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Speed Dial')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'touch_app',
                            v1DetailsPageSectionId: 'collapse_speed',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsSpeedDialEdit',
                        path: '/subscriber/:id/preferences/speeddial/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsSpeedDialEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.speeddial'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsSpeedDial',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsReminder',
                        path: 'reminder',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsReminder'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Reminder')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'notifications',
                            v1DetailsPageSectionId: 'collapse_rm',
                            proxy: true,
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsCallthroughClis',
                        path: 'callthrough-clis',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallthroughCliList'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Callthrough CLIs')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'alt_route',
                            v1DetailsPageSectionId: 'collapse_ccmap',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsCallthroughClisEdit',
                        path: '/subscriber/:id/details/ccmappings/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallthroughCliEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.ccmapentries'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallthroughClis',
                            icon: 'edit',
                            v1DetailsPageSectionId: 'collapse_ccmap',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/ccmappings/edit'
                                return url
                            },
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsTrustedSources',
                        path: 'trusted-sources',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsTrustedSources'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.trustedsources'
                            },
                            get label () {
                                return i18n.global.tc('Trusted Sources')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'verified_user',
                            v1DetailsPageSectionId: 'collapse_ts',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberTrustedSourcesCreation',
                        path: '/subscriber/:id/details/trusted/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsTrustedSourcesCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.trustedsources'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsTrustedSources',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/trusted/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberTrustedSourcesEdit',
                        path: '/subscriber/:id/details/trusted/:trustedSourceId/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsTrustedSourcesEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.trustedsources'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsTrustedSources',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/trusted/' + route.params.trustedSourceId + '/edit'
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberDetailsHeaderManipulations',
                        path: 'header-manipulations',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderManipulations'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Header Manipulations')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-edit',
                            v1DetailsPageSectionId: 'collapse_hdr',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberHeaderRuleCreate',
                        path: '/subscriber/:id/preferences/header/create',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderManipulations',
                            icon: 'add',
                            proxy: true,
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberHeaderRuleEdit',
                        path: '/subscriber/:id/preferences/header/:headerId/edit',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderManipulations',
                            proxy: true,
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberHeaderRuleConditions',
                        path: '/subscriber/:id/preferences/header/:headerId/conditions',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Conditions')
                            },
                            icon: 'filter_alt',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderManipulations',
                            proxy: true,
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberHeaderRuleActions',
                        path: '/subscriber/:id/preferences/header/:headerId/actions',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Actions')
                            },
                            icon: 'play_arrow',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderManipulations',
                            proxy: true,
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsLocationMappings',
                        path: 'location-mappings',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappings'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscriberlocationmappings'
                            },
                            get label () {
                                return i18n.global.tc('Location Mappings')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fmd_good',
                            v1DetailsPageSectionId: 'collapse_lm',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberLocationMappingsCreation',
                        path: 'location-mappings/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappingsCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.subscriberlocationmappings'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsLocationMappings',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/locationmap/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberLocationMappingsEdit',
                        path: 'location-mappings/:locationMappingId/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappingsEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscriberlocationmappings'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsLocationMappings',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/locationmap/' + route.params.locationMappingId + '/edit'
                                return url
                            }
                        }
                    }
                ]
            },
            {
                name: 'subscriberPreferences',
                path: 'preferences',
                component: () => import('pages/subscribers/AuiSubscriberPreferences'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.global.tc('Preferences')
                    },
                    icon: 'settings_applications',
                    parentPath: 'subscriberList.subscriberContext',
                    menu: true
                }
            },
            {
                name: 'subscriberCallHistory',
                path: 'calls',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.global.tc('Call History')
                    },
                    icon: 'list',
                    parentPath: 'subscriberList.subscriberContext',
                    menu: true,
                    proxy: true
                }
            }
        ]
    },
    {
        name: 'subscriberCatchAll',
        path: '/subscriber/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.subscribers'
            },
            proxy: true
        }
    }
]
