import { i18n } from 'boot/i18n'

export function bootstrapConfigOptions () {
    return [
        {
            value: 'GET',
            label: i18n.global.tc('GET')
        },
        {
            value: 'POST',
            label: i18n.global.tc('POST')
        }
    ]
}
export function bootstrapMethodOptions () {
    return [
        {
            value: 'http',
            label: i18n.global.tc('Cisco')
        },
        {
            value: 'redirect_panasonic',
            label: i18n.global.tc('Panasonic')
        },
        {
            value: 'redirect_yealink',
            label: i18n.global.tc('Yealink')
        },
        {
            value: 'redirect_polycom',
            label: i18n.global.tc('Polycom')
        },
        {
            value: 'redirect_snom',
            label: i18n.global.tc('Snom')
        },
        {
            value: 'redirect_grandstream',
            label: i18n.global.tc('Grandstream')
        },
        {
            value: 'redirect_ale',
            label: i18n.global.tc('ALE')
        },
        {
            value: 'none',
            label: i18n.global.tc('None')
        }
    ]
}
export function dataTypeOptions () {
    return [
        {
            value: 'string',
            label: i18n.global.tc('String')
        },
        {
            value: 'boolean',
            label: i18n.global.tc('Boolean')
        },
        {
            value: 'int',
            label: i18n.global.tc('Integer')
        },
        {
            value: 'enum',
            label: i18n.global.tc('Enum')
        }
    ]
}
export function orientationOptions () {
    return [
        {
            value: 'top',
            label: i18n.global.tc('Top')
        },
        {
            value: 'topleft',
            label: i18n.global.tc('Topleft')
        },
        {
            value: 'topright',
            label: i18n.global.tc('Topright')
        },
        {
            value: 'bottom',
            label: i18n.global.tc('Bottom')
        },
        {
            value: 'bottomleft',
            label: i18n.global.tc('Bottomleft')
        },
        {
            value: 'bottomright',
            label: i18n.global.tc('Bottomright')
        },
        {
            value: 'left',
            label: i18n.global.tc('Left')
        },
        {
            value: 'right',
            label: i18n.global.tc('Right')
        }
    ]
}
export function typeOptions () {
    return [
        {
            value: 'phone',
            label: i18n.global.tc('Phone device')
        },
        {
            value: 'extension',
            label: i18n.global.tc('Extension device')
        }
    ]
}
