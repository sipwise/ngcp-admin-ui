import { i18n } from 'boot/i18n'

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
                return i18n.t('Device Management')
            },
            icon: 'fas fa-fax',
            proxy: true,
            capability: 'cloudpbx'
        }
    },
    {
        name: 'deviceListCatchAll',
        path: '/device/*',
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
