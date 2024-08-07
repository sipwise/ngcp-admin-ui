import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'deviceList',
        path: '/device',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.tc('Device Management')
            },
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            proxy: true,
            capability: 'cloudpbx'
        }
    },
    createAdvancedJournalRoute({
        name: 'deviceJournalAdvanced',
        path: '/device/journal',
        resource: 'pbxdevices',
        parentPath: 'deviceList',
        licenses: [LICENSES.device_provisioning, LICENSES.pbx]
    }),
    {
        name: 'deviceListCatchAll',
        path: '/device/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.pbxdevices'
            },
            proxy: true,
            capability: 'cloudpbx'
        }
    }
]
