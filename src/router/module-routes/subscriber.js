import { i18n } from 'boot/i18n'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'
import {
    createAdvancedJournalRoute, createJournalRoute,
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
        redirect: (to) => {
            return { name: 'subscriberDetails', params: to.params }
        },
        component: () => import('pages/subscribers/AuiSubscriberContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.subscribers'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.username}`
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
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsGroupMembers'),
                        meta: {
                            get label () {
                                return i18n.global.tc('PBX Group Members')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-user-friends',
                            customerType: 'pbxaccount',
                            subscriberType: 'pbx-group',
                            v1DetailsPageSectionId: 'collapse_pbx_group_items',
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
                            $p: {
                                operation: 'read',
                                resource: 'entity.callrecordings'
                            },
                            get label () {
                                return i18n.global.tc('Call Recordings')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'play_circle',
                            licenses: [LICENSES.call_recording],
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
                            $p: {
                                operation: 'read',
                                resource: 'entity.sipcaptures'
                            },
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
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscriberphonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Phonebook')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-address-book',
                            licenses: [LICENSES.phonebook],
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
                            licenses: [LICENSES.phonebook],
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
                                resource: 'entity.subscriberphonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsPhonebook',
                            icon: 'edit',
                            licenses: [LICENSES.phonebook],
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsPhonebookEntryUploadCSV',
                        path: '/subscriber/:id/details/phonebook_upload_csv',
                        component: () => import('pages/AuiDetailsPhonebookUpload'),
                        props: {
                            path: 'subscriberphonebookentries'
                        },
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscriberphonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Upload CSV')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsPhonebook',
                            icon: 'fas fa-upload',
                            licenses: [LICENSES.phonebook],
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'subscriberDetailsCallForwarding',
                        path: 'call-forwarding',
                        component: () => import('pages/subscriber-call-forwarding-source/AuiSubscriberDetailsCallForwarding'),
                        props: {
                            detailsPageRouteName: 'subscriberDetailsCallForwarding',
                            redirectToSubpageRoute: { name: 'subscriberDetailsCallForwardingSummary' }
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.cfmappings'
                            },
                            get label () {
                                return i18n.global.tc('Call Forwarding')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'phone_forwarded',
                            v1DetailsPageSectionId: 'collapse_cf'
                        },
                        children: [
                            {
                                name: 'subscriberDetailsCallForwardingSummary',
                                path: 'summary',
                                component: () => import('pages/subscriber-call-forwarding-unconditional/AuiSubscriberDetailsCallForwardingSummary'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Summary')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'list',
                                    v1DetailsPageSectionId: 'collapse_cfu',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingUnconditionalContext',
                                path: 'unconditional',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingUnconditionalEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-unconditional/AuiSubscriberDetailsCallForwardingUnconditionalContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.unconditional'
                                    },
                                    get label () {
                                        return i18n.global.tc('Unconditional')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cfu`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: () => {
                                        return 'Unconditional'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingUnconditionalEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-unconditional/AuiSubscriberDetailsCallForwardingUnconditionalEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingUnconditionalContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingBusyContext',
                                path: 'busy',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingBusyEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-busy/AuiSubscriberDetailsCallForwardingBusyContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.busy'
                                    },
                                    get label () {
                                        return i18n.global.tc('Busy')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cfb`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: () => {
                                        return 'Busy'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingBusyEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-busy/AuiSubscriberDetailsCallForwardingBusyEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingBusyContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingTimeOutContext',
                                path: 'timeout',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingTimeOutEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-timeout/AuiSubscriberDetailsCallForwardingTimeoutContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.timeout'
                                    },
                                    get label () {
                                        return i18n.global.tc('Timeout')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cft`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: () => {
                                        return 'Timeout'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingTimeOutEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-timeout/AuiSubscriberDetailsCallForwardingTimeoutEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingTimeOutContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingUnavailableContext',
                                path: 'unavailable',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingUnavailableEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-unavailable/AuiSubscriberDetailsCallForwardingUnavailableContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.unavailable'
                                    },
                                    get label () {
                                        return i18n.global.tc('Unavailable')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cfna`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: () => {
                                        return 'Unavailable'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingUnavailableEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-unavailable/AuiSubscriberDetailsCallForwardingUnavailableEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingUnavailableContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingSmsContext',
                                path: 'sms',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingSmsEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-sms/AuiSubscriberDetailsCallForwardingSmsContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.sms'
                                    },
                                    get label () {
                                        return i18n.global.tc('Sms')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cfs`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return 'Sms'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingSmsEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-sms/AuiSubscriberDetailsCallForwardingSmsEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingSmsContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingOnResponseContext',
                                path: 'on-response',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingOnResponseEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-onresponse/AuiSubscriberDetailsCallForwardingOnResponseContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.onresponse'
                                    },
                                    get label () {
                                        return i18n.global.tc('On Response')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cfr`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return 'On Response'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingOnResponseEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-onresponse/AuiSubscriberDetailsCallForwardingOnResponseEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingOnResponseContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingOnOverflowContext',
                                path: 'on-overflow',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingOnOverflowEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-onoverflow/AuiSubscriberDetailsCallForwardingOnOverflowContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfmappings.onoverflow'
                                    },
                                    get label () {
                                        return i18n.global.tc('On Overflow')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-share-square',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences/callforward/cfo`
                                        return url
                                    },
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return 'On Overflow'
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingOnOverflowEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-onoverflow/AuiSubscriberDetailsCallForwardingOnOverflowEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfmappings'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingOnOverflowContext',
                                            hideFromPageMenu: true,
                                            menu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingSourceSet',
                                path: 'source-set',
                                component: () => import('pages/subscriber-call-forwarding-source/AuiSubscriberDetailsCallForwardingSource'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('SourceSet')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-sliders-h',
                                    v1DetailsPageSectionId: 'collapse_cfu',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingSourceSetCreation',
                                path: 'source-set/create',
                                component: () => import('pages/subscriber-call-forwarding-source/AuiSubscriberDetailsCallForwardingSourceCreation'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingSourceSet',
                                    icon: 'add',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingSourceSetContext',
                                path: 'source-set/:sourcesetId',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingSourceSetEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-source/AuiSubscriberDetailsCallForwardingSourceContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfsourcesets'
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingSourceSet',
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return `#${resourceObject.id} - ${resourceObject.name}`
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingSourceSetEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-source/AuiSubscriberDetailsCallForwardingSourceEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfsourcesets'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingSourceSet.subscriberDetailsCallForwardingSourceSetContext',
                                            hideFromPageMenu: true,
                                            menu: true,
                                            goToPathRewrite: ({ route, url }) => {
                                                url.pathname = `/subscriber/${route.params.id}/preferences`
                                                return url
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingTimeSet',
                                path: 'time-set',
                                component: () => import('pages/subscriber-call-forwarding-time/AuiSubscriberDetailsCallForwardingTime'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Time Set')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-sliders-h',
                                    v1DetailsPageSectionId: 'collapse_cfu',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingTimeSetCreation',
                                path: 'time-set/create',
                                component: () => import('pages/subscriber-call-forwarding-time/AuiSubscriberDetailsCallForwardingTimeCreation'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingTimeSet',
                                    icon: 'add',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingTimeSetContext',
                                path: 'time-set/:timesetId',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingTimeSetEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-time/AuiSubscriberDetailsCallForwardingTimeContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cftimesets'
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingTimeSet',
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return `#${resourceObject.id} - ${resourceObject.name}`
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingTimeSetEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-time/AuiSubscriberDetailsCallForwardingTimeEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cftimesets'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingTimeSet.subscriberDetailsCallForwardingTimeSetContext',
                                            hideFromPageMenu: true,
                                            menu: true,
                                            goToPathRewrite: ({ route, url }) => {
                                                url.pathname = `/subscriber/${route.params.id}/preferences`
                                                return url
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingBNumberSet',
                                path: 'number-set',
                                component: () => import('pages//subscriber-call-forwarding-bnumber/AuiSubscriberDetailsCallForwardingBNumber'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('BNumberSet')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-sliders-h',
                                    v1DetailsPageSectionId: 'collapse_cfu',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingBNumberSetCreation',
                                path: 'number-set/create',
                                component: () => import('pages/subscriber-call-forwarding-bnumber/AuiSubscriberDetailsCallForwardingBNumberCreation'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingBNumberSet',
                                    icon: 'add',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingBNumberSetContext',
                                path: 'number-set/:bnumbersetId',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingBNumberSetEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-bnumber/AuiSubscriberDetailsCallForwardingBNumberContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfbnumbersets'
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingBNumberSet',
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return `#${resourceObject.id} - ${resourceObject.name}`
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingBNumberSetEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-bnumber/AuiSubscriberDetailsCallForwardingBNumberEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfbnumbersets'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingBNumberSet.subscriberDetailsCallForwardingBNumberSetContext',
                                            hideFromPageMenu: true,
                                            menu: true,
                                            goToPathRewrite: ({ route, url }) => {
                                                url.pathname = `/subscriber/${route.params.id}/preferences`
                                                return url
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberDetailsCallForwardingDestinationSet',
                                path: 'destination-set',
                                component: () => import('pages/subscriber-call-forwarding-destination/AuiSubscriberDetailsCallForwardingDestination'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('DestinationSet')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding',
                                    icon: 'fas fa-sliders-h',
                                    v1DetailsPageSectionId: 'collapse_cfu',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingDestinationSetCreation',
                                path: 'destination-set/create',
                                component: () => import('pages/subscriber-call-forwarding-destination/AuiSubscriberDetailsCallForwardingDestinationCreation'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingDestinationSet',
                                    icon: 'add',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = `/subscriber/${route.params.id}/preferences`
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwardingDestinationSetContext',
                                path: 'destination-set/:destinationsetId',
                                redirect: (to) => {
                                    return { name: 'subscriberDetailsCallForwardingDestinationSetEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-call-forwarding-destination/AuiSubscriberDetailsCallForwardingDestinationContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.cfdestinationsets'
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingDestinationSet',
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return `#${resourceObject.id} - ${resourceObject.name}`
                                    }
                                },
                                children: [
                                    {
                                        name: 'subscriberDetailsCallForwardingDestinationSetEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-call-forwarding-destination/AuiSubscriberDetailsCallForwardingDestinationEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.cfdestinationsets'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsCallForwarding.subscriberDetailsCallForwardingDestinationSet.subscriberDetailsCallForwardingDestinationSetContext',
                                            hideFromPageMenu: true,
                                            menu: true,
                                            goToPathRewrite: ({ route, url }) => {
                                                url.pathname = `/subscriber/${route.params.id}/preferences`
                                                return url
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
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
                            licenses: [LICENSES.fax],
                            v1DetailsPageSectionId: 'collapse_fax',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberDetailsAutoAttendant',
                        path: 'auto-attendant',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsAutoAttendant'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Auto Attendant Slots')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'dialpad',
                            v1DetailsPageSectionId: 'collapse_aa',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            customerType: 'pbxaccount',
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'AuiSubscriberDetailsAutoAttendantEdit',
                        path: '/subscriber/:id/preferences/autoattendant/edit',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsAutoAttendantEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.autoattendants'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsAutoAttendant',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = `/subscriber/${route.params.id}/preferences/autoattendant/edit`
                                return url
                            },
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
                            $p: {
                                operation: 'read',
                                resource: 'entity.reminders'
                            },
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
                                url.pathname = `/subscriber/${route.params.id}/preferences/ccmappings/edit`
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
                                url.pathname = `/subscriber/${route.params.id}/preferences/trusted/create`
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
                                url.pathname = `/subscriber/${route.params.id}/preferences/trusted/${route.params.trustedSourceId}/edit`
                                return url
                            }
                        }
                    },
                    {
                        name: 'subscriberDetailsHeaderRule',
                        path: 'header-manipulations',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleList'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Header Manipulations')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                            icon: 'fas fa-edit',
                            licenses: [LICENSES.header_manipulation],
                            v1DetailsPageSectionId: 'collapse_hdr',
                            goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberHeaderRuleCreate',
                        path: 'header-manipulations/create',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule',
                            icon: 'add',
                            licenses: [LICENSES.header_manipulation],
                            hideFromPageMenu: true,
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'subscriberHeaderRuleContext',
                        path: 'header-manipulations/:headerRuleId',
                        redirect: (to) => {
                            return {
                                name: 'subscriberHeaderRuleEdit',
                                params: to.params
                            }
                        },
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleContext'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.headerrules'
                            },
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return `#${resourceObject.id}-${resourceObject.name}`
                            },
                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule'
                        },
                        children: [
                            {
                                name: 'subscriberHeaderRuleEdit',
                                path: 'edit',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleEdit'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerrules'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext',
                                    icon: 'edit',
                                    licenses: [LICENSES.header_manipulation],
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleAction',
                                path: 'actions',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleActionList'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.headerrulesactions'
                                    },
                                    get label () {
                                        return i18n.global.tc('Actions')
                                    },
                                    icon: 'play_arrow',
                                    licenses: [LICENSES.header_manipulation],
                                    menu: true,
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext',
                                    platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleActionCreate',
                                path: 'actions/create',
                                component: () => import('pages/header-manipulations-rules-actions/AuiHeaderManipulationsRuleActionCreation'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerrulesactions'
                                    },
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    icon: 'add',
                                    licenses: [LICENSES.header_manipulation],
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext.subscriberHeaderRuleAction',
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleActionContext',
                                path: 'actions/:headerRuleActionId',
                                redirect: (to) => {
                                    return { name: 'subscriberHeaderRuleActionEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleActionContext'),
                                props: true,
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.headerrulesactions'
                                    },
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return `#${resourceObject.id} - ${resourceObject.header}`
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext.subscriberHeaderRuleAction'
                                },
                                children: [
                                    {
                                        name: 'subscriberHeaderRuleActionEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleActionsEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'create',
                                                resource: 'entity.headerrulesactions'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            licenses: [LICENSES.header_manipulation],
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext.subscriberHeaderRuleAction.subscriberHeaderRuleActionContext',
                                            hideFromPageMenu: true
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'subscriberHeaderRuleCondition',
                                path: 'conditions',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleConditionList'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.headerrulesconditions'
                                    },
                                    get label () {
                                        return i18n.global.tc('Conditions')
                                    },
                                    icon: 'filter_alt',
                                    licenses: [LICENSES.header_manipulation],
                                    menu: true,
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext',
                                    platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleConditionCreate',
                                path: 'conditions/create',
                                component: () => import('pages/header-manipulations-rules-conditions/AuiHeaderManipulationsRuleConditionCreation'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerrulesconditions'
                                    },
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    icon: 'add',
                                    licenses: [LICENSES.header_manipulation],
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext.subscriberHeaderRuleCondition',
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleConditionContext',
                                path: 'conditions/:headerRuleConditionId',
                                redirect: (to) => {
                                    return { name: 'subscriberHeaderRuleConditionEdit', params: to.params }
                                },
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleConditionContext'),
                                props: true,
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.headerrulesconditions'
                                    },
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return `#${resourceObject.id} - ${resourceObject.match_name}`
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext.subscriberHeaderRuleCondition'
                                },
                                children: [
                                    {
                                        name: 'subscriberHeaderRuleConditionEdit',
                                        path: 'edit',
                                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderRuleConditionEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'create',
                                                resource: 'entity.headerrulesconditions'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            licenses: [LICENSES.header_manipulation],
                                            parentPath: 'subscriberList.subscriberContext.subscriberDetails.subscriberDetailsHeaderRule.subscriberHeaderRuleContext.subscriberHeaderRuleCondition.subscriberHeaderRuleConditionContext',
                                            hideFromPageMenu: true
                                        }
                                    }
                                ]
                            }
                        ]
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
                                url.pathname = `/subscriber/${route.params.id}/preferences/locationmap/create`
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
                                url.pathname = `/subscriber/${route.params.id}/preferences/locationmap/${route.params.locationMappingId}/edit`
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
