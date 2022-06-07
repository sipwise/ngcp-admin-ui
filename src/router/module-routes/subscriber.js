import { i18n } from 'boot/i18n'
import {
    detailsPagePathRewrite,
    detailsPageToPreferencesPagePathRewrite,
    subscriberCallDetailsPathRewrite
} from 'src/router/common'

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
                return i18n.t('Subscribers')
            },
            icon: 'fas fa-user',
            root: true
        }
    },
    {
        name: 'subscriberContext',
        path: '/subscriber/:id',
        component: () => import('pages/subscribers/AuiSubscriberContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscribers'
            },
            contextRoot: true,
            parentPath: 'subscriberList'
        },
        children: [
            {
                name: 'subscriberEdit',
                path: 'details/edit',
                component: () => import('pages/AuiDetailsPageProxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    parentPath: 'subscriberList.subscriberContext',
                    icon: 'edit',
                    proxy: true
                }
            },
            {
                name: 'subscriberJournal',
                path: 'journal',
                component: () => import('pages/subscribers/AuiSubscriberJournal'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.t('Journal')
                    },
                    icon: 'list',
                    parentPath: 'subscriberList.subscriberContext',
                    menu: true
                }
            },
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
                        return i18n.t('Details')
                    },
                    icon: 'article',
                    parentPath: 'subscriberList.subscriberContext',
                    menu: true,
                    goToPathRewrite: detailsPagePathRewrite
                },
                children: [
                    {
                        name: 'subscriberDetailsMasterData',
                        path: 'master-data',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsMasterData'),
                        meta: {
                            get label () {
                                return i18n.t('Master Data')
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
                                return i18n.t('PBX Groups')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-user-friends',
                            visibleOnlyForCustomerType: 'pbxaccount',
                            visibleOnlyForSubscriberType: 'subscriber',
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
                                return i18n.t('PBX Group members')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-user-friends',
                            visibleOnlyForCustomerType: 'pbxaccount',
                            visibleOnlyForSubscriberType: 'pbxgroup',
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
                                return i18n.t('Voicemails')
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
                                return i18n.t('Call Recordings')
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
                                return i18n.t('Call details')
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
                                return i18n.t('Recorded files')
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
                                return i18n.t('Registered Devices')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'devices',
                            v1DetailsPageSectionId: 'collapse_regdev'
                        }
                    },
                    {
                        name: 'subscriberDetailsRegisteredDeviceCreation',
                        path: 'registered/create',
                        component: () => import('pages/AuiSubscriberRegisteredDevicesCreation'),
                        meta: {
                            get label () {
                                return i18n.t('Registered Devices')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'devices',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsCapturedDialogs',
                        path: 'captured-dialogs',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCapturedDialogs'),
                        meta: {
                            get label () {
                                return i18n.t('Captured Dialogs')
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
                                return i18n.t('Call map')
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
                                return i18n.t('Phonebook')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-address-book',
                            v1DetailsPageSectionId: 'collapse_phonebook'
                        }
                    },
                    {
                        name: 'subscriberDetailsPhonebookEntryCreation',
                        path: '/subscriber/:id/details/phonebook/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebookCreation'),
                        meta: {
                            get label () {
                                return i18n.t('Add Phonebook Entry')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'add',
                            hideFromPageMenu: true
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
                                return i18n.t('Edit')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'edit',
                            hideFromPageMenu: true
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
                                return i18n.t('Upload CSV')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
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
                                return i18n.t('Call Forwarding')
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
                                return i18n.t('Voicemail Settings')
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
                                return i18n.t('Fax Features')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fax',
                            v1DetailsPageSectionId: 'collapse_fax',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
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
                                return i18n.t('Auto Attendant Slots')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'dialpad',
                            v1DetailsPageSectionId: 'collapse_aa',
                            proxy: true,
                            proxyRewrite: detailsPageToPreferencesPagePathRewrite,
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            visibleOnlyForCustomerType: 'pbxaccount',
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'subscriberDetailsSpeedDial',
                        path: 'speed-dial',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsSpeedDial'),
                        meta: {
                            get label () {
                                return i18n.t('Speed Dial')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'touch_app',
                            v1DetailsPageSectionId: 'collapse_speed',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberDetailsSpeedDialCreation',
                        path: '/subscriber/:id/preferences/speeddial/create',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.speeddial'
                            },
                            get label () {
                                return i18n.t('Create Speed Dial')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'touch_app',
                            proxy: true,
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsSpeedDialEdit',
                        path: '/subscriber/:id/preferences/speeddial/:speedDialId/edit',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.speeddial'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            proxy: true,
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsReminder',
                        path: 'reminder',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsReminder'),
                        meta: {
                            get label () {
                                return i18n.t('Reminder')
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
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallthroughCLIs'),
                        meta: {
                            get label () {
                                return i18n.t('Callthrough CLIs')
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
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallthroughCLIsEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.ccmapentries'
                            },
                            get label () {
                                return i18n.t('Edit Callthrough CLIs')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'alt_route',
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
                                return i18n.t('Trusted Sources')
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
                                return i18n.t('Create Trusted Source')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'verified_user',
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
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/trusted/' + route.params.trustedSourceId + '/edit'
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberDetailsUpnRewrite',
                        path: 'upn-rewrite',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsUpnRewrite'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.upnrewritesets'
                            },
                            get label () {
                                return i18n.t('UPN Rewrite')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-id-card',
                            v1DetailsPageSectionId: 'collapse_upnr',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberUpnRewriteCreate',
                        path: '/subscriber/:id/details/upn-rewrite/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsUpnRewriteCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.upnrewritesets'
                            },
                            get label () {
                                return i18n.t('Create UPN Rewrite')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-id-card',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/upnrewrite/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberUpnRewriteEdit',
                        path: '/subscriber/:id/details/upn-rewrite/:upnRewriteId/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsUpnRewriteEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.upnrewritesets'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/upnrewrite/' + route.params.upnRewriteId + '/edit'
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
                                return i18n.t('Header Manipulations')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-edit',
                            v1DetailsPageSectionId: 'collapse_hdr',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
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
                                return i18n.t('Create Header Rule')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-id-card',
                            proxy: true,
                            hideFromPageMenu: true
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
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            proxy: true,
                            hideFromPageMenu: true
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
                                return i18n.t('Conditions')
                            },
                            icon: 'filter_alt',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            proxy: true,
                            hideFromPageMenu: true
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
                                return i18n.t('Actions')
                            },
                            icon: 'play_arrow',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            proxy: true,
                            hideFromPageMenu: true
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
                                return i18n.t('Location Mappings')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fmd_good',
                            v1DetailsPageSectionId: 'collapse_lm',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                        }
                    },
                    {
                        name: 'subscriberLocationMappingsCreation',
                        path: '/subscriber/:id/details/locationmap/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappingsCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.subscriberlocationmappings'
                            },
                            get label () {
                                return i18n.t('Create Location Mapping')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fmd_good',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.id + '/preferences/locationmap/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberLocationMappingsEdit',
                        path: '/subscriber/:id/details/locationmap/:locationMappingId/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappingsEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscriberlocationmappings'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
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
                        return i18n.t('Preferences')
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
                        return i18n.t('Call History')
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
        path: '/subscriber/*',
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
