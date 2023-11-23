import { billingProfileLabel, idAndNameLabel, contactLabel, formatPhoneNumber, idAndZoneLabel } from 'src/filters/resource'
import { defaultFilterPayloadTransformation, resellerPayloadTransformation } from 'src/api/common'

function actionPayloadTransformationFn (payload) {
    payload = defaultFilterPayloadTransformation(payload)
    payload = resellerPayloadTransformation(payload)
    return payload
}

function contactPayloadTransformationFn (payload) {
    payload = defaultFilterPayloadTransformation(payload)
    payload.email = payload.name
    delete payload.name
    payload = resellerPayloadTransformation(payload)
    return payload
}

function defaultOptionsGetterFn (item) {
    return {
        label: idAndNameLabel(item),
        value: item.id
    }
}
export default {
    SelectLazy: [
        {
            name: 'emailTemplatesList',
            apiOptions: {
                resource: 'emailtemplates'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn
        }, {
            name: 'invoiceTemplatesList',
            apiOptions: {
                resource: 'invoicetemplates'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn
        },
        {
            name: 'billingProfilesList',
            apiOptions: {
                resource: 'billingprofiles'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: billingProfileLabel(item),
                    value: item.id
                }
            }
        }, {
            name: 'billingNetworksList',
            apiOptions: {
                resource: 'billingnetworks'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'profilePackagesList',
            apiOptions: {
                resource: 'profilepackages'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'rewriteRuleSetList',
            apiOptions: {
                resource: 'rewriterulesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'rewriteRuleSetsList',
            apiOptions: {
                resource: 'rewriterulesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'ncosLevelList',
            apiOptions: {
                resource: 'ncoslevels'
            },
            actionPayloadTransformationFn (payload) {
                payload = defaultFilterPayloadTransformation(payload)
                payload.level = payload.name
                delete payload.name
                payload = resellerPayloadTransformation(payload)
                return payload
            },
            defaultOptionsGetterFn (item) {
                return {
                    label: item.level,
                    value: item.level
                }
            }
        },
        {
            name: 'ncosSetsList',
            apiOptions: {
                resource: 'v2/ncos/sets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'soundSetList',
            apiOptions: {
                resource: 'soundsets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'headerRuleSetList',
            apiOptions: {
                resource: 'headerrulesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'emergencyMappingContainerList',
            apiOptions: {
                resource: 'emergencymappingcontainers'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'systemContactsList',
            apiOptions: {
                resource: 'systemcontacts'
            },
            actionPayloadTransformationFn: contactPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: contactLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'customerContactsList',
            apiOptions: {
                resource: 'customercontacts'
            },
            actionPayloadTransformationFn: contactPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: contactLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'domainList',
            apiOptions: {
                resource: 'domains'
            },
            actionPayloadTransformationFn (payload) {
                payload = defaultFilterPayloadTransformation(payload)
                payload.domain = payload.name
                delete payload.name
                payload = resellerPayloadTransformation(payload)
                return payload
            },
            defaultOptionsGetterFn (item) {
                return {
                    label: item.domain,
                    value: item.id
                }
            }
        },
        {
            name: 'groupsList',
            apiOptions: {
                resource: 'subscribers'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: item.username,
                    value: item.id
                }
            }
        },
        {
            name: 'zonesList',
            apiOptions: {
                resource: 'billingzones'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndZoneLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'numbersList',
            apiOptions: {
                resource: 'numbers'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (number) {
                return {
                    label: formatPhoneNumber(number, ''),
                    value: number.id,
                    number: number
                }
            }
        },
        {
            name: 'subscriberProfileSetList',
            apiOptions: {
                resource: 'subscriberprofilesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: item.name,
                    value: item.id
                }
            }
        },
        {
            name: 'subscriberProfileList',
            apiOptions: {
                resource: 'subscriberprofiles'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: item.name,
                    value: item.id
                }
            }
        },
        {
            name: 'lnpCarrierList',
            apiOptions: {
                resource: 'lnpcarriers'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: item.name,
                    value: item.id
                }
            }
        }
    ]
}
