import { i18n } from 'boot/i18n'

export function bootstrapConfigOptions () {
    return [
        {
            value: 'GET',
            label: i18n.global.t('GET')
        },
        {
            value: 'POST',
            label: i18n.global.t('POST')
        }
    ]
}
export function bootstrapMethodOptions () {
    return [
        {
            value: 'http',
            label: i18n.global.t('Cisco')
        },
        {
            value: 'redirect_panasonic',
            label: i18n.global.t('Panasonic')
        },
        {
            value: 'redirect_yealink',
            label: i18n.global.t('Yealink')
        },
        {
            value: 'redirect_polycom',
            label: i18n.global.t('Polycom')
        },
        {
            value: 'redirect_snom',
            label: i18n.global.t('Snom')
        },
        {
            value: 'redirect_grandstream',
            label: i18n.global.t('Grandstream')
        },
        {
            value: 'redirect_ale',
            label: i18n.global.t('ALE')
        },
        {
            value: 'none',
            label: i18n.global.t('None')
        }
    ]
}
export function dataTypeOptions () {
    return [
        {
            value: 'string',
            label: i18n.global.t('String')
        },
        {
            value: 'boolean',
            label: i18n.global.t('Boolean')
        },
        {
            value: 'int',
            label: i18n.global.t('Integer')
        },
        {
            value: 'enum',
            label: i18n.global.t('Enum')
        }
    ]
}
export function orientationOptions () {
    return [
        {
            value: 'top',
            label: i18n.global.t('Top')
        },
        {
            value: 'topleft',
            label: i18n.global.t('Topleft')
        },
        {
            value: 'topright',
            label: i18n.global.t('Topright')
        },
        {
            value: 'bottom',
            label: i18n.global.t('Bottom')
        },
        {
            value: 'bottomleft',
            label: i18n.global.t('Bottomleft')
        },
        {
            value: 'bottomright',
            label: i18n.global.t('Bottomright')
        },
        {
            value: 'left',
            label: i18n.global.t('Left')
        },
        {
            value: 'right',
            label: i18n.global.t('Right')
        }
    ]
}
export function typeOptions () {
    return [
        {
            value: 'phone',
            label: i18n.global.t('Phone device')
        },
        {
            value: 'extension',
            label: i18n.global.t('Extension device')
        }
    ]
}
