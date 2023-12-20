import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'soundSetList',
        path: '/sound',
        component: () => import('pages/sound-set/AuiSoundSetsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.soundsets'
            },
            get label () {
                return i18n.global.tc('Sound Sets')
            },
            icon: 'fas fa-music',
            root: true,
            journalRouteName: 'soundSetJournalAdvanced'
        }
    },
    {
        name: 'soundSetsCreation',
        path: '/sound/create',
        component: () => import('pages/sound-set/AuiSoundSetsCreation'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.soundsets'
            },
            get label () {
                return i18n.global.tc('Add Sound Sets')
            },
            icon: 'add',
            parentPath: 'soundSetList',
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'soundSetJournalAdvanced',
        path: '/sound/journal',
        resource: 'soundsets',
        parentPath: 'soundSetList'
    }),
    {
        name: 'soundSetsContext',
        path: '/sound/:id',
        redirect: (to) => {
            return { name: 'soundSetsEdit', params: to.params }
        },
        component: () => import('pages/sound-set/AuiSoundSetsContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.soundsets'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'soundSetList'
        },
        children: [
            {
                name: 'soundSetsEdit',
                path: 'edit',
                component: () => import('pages/sound-set/AuiSoundSetsEdit'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.soundsets'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'soundSetList.soundSetsContext'
                }
            },
            {
                name: 'soundSetHandles',
                path: 'handles',
                component: () => import('pages/sound-set/AuiSoundSetsFiles'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.soundsets'
                    },
                    get label () {
                        return i18n.global.tc('Files')
                    },
                    icon: 'article',
                    parentPath: 'soundSetList.soundSetsContext'
                }
            },
            {
                name: 'soundSetDefault',
                path: 'handles/loaddefault',
                component: () => import('pages/sound-set/AuiSoundSetsDefaultFiles'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.soundsets'
                    },
                    get label () {
                        return i18n.global.tc('Load Default Files')
                    },
                    icon: 'fas fa-star',
                    parentPath: 'soundSetList.soundSetsContext'
                }
            }
        ]
    },
    {
        name: 'soundSetCatchAll',
        path: '/sound/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.soundsets'
            },
            proxy: true
        }
    }
]
