import {
    defaultFilterPayloadTransformation,
    groupFilterPayloadTransformation,
    resellerPayloadTransformation
} from 'src/api/common'
import {
    billingProfileLabel,
    callForwardParamSetLabel,
    contactLabel,
    formatPhoneNumber,
    idAndNameLabel,
    idAndZoneLabel
} from 'src/filters/resource'

function actionPayloadTransformationFn (payload) {
    let transformedPayload = defaultFilterPayloadTransformation(payload)
    transformedPayload = resellerPayloadTransformation(transformedPayload)
    return transformedPayload
}

function contactPayloadTransformationFn (payload) {
    let transformedPayload = defaultFilterPayloadTransformation(payload)
    transformedPayload.email = transformedPayload.name
    delete transformedPayload.name
    transformedPayload = resellerPayloadTransformation(transformedPayload)
    return transformedPayload
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
                let transformedPayload = defaultFilterPayloadTransformation(payload)
                transformedPayload.level = transformedPayload.name
                delete transformedPayload.name
                transformedPayload = resellerPayloadTransformation(transformedPayload)
                return transformedPayload
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
            name: 'headerSetList',
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
            name: 'pbxCustomers',
            apiOptions: {
                resource: 'customers'
            },
            // note that /customers doesn't allow filtering by name nor id
            // when this will be allowed, customise the actionPayloadTransformationFn
            // to replace payload.filter with payload[filterTranslatedIntoParamName]
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: `${item.id} - ${item.contact_id_expand.email}`,
                    value: item.id
                }
            }
        },
        // Call forward config
        {
            name: 'destinationSets',
            apiOptions: {
                resource: 'cfdestinationsets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: callForwardParamSetLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'bNumberSets',
            apiOptions: {
                resource: 'cfbnumbersets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: callForwardParamSetLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'sourceSets',
            apiOptions: {
                resource: 'cfsourcesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: callForwardParamSetLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'timeSets',
            apiOptions: {
                resource: 'cftimesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: callForwardParamSetLabel(item),
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
                let transformedPayload = defaultFilterPayloadTransformation(payload)
                transformedPayload.domain = transformedPayload.name
                delete transformedPayload.name
                transformedPayload = resellerPayloadTransformation(transformedPayload)
                return transformedPayload
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
            actionPayloadTransformationFn (payload) {
                return groupFilterPayloadTransformation(payload)
            },
            defaultOptionsGetterFn (item) {
                const label = `${item.username} (${item.display_name})`
                return {
                    label,
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
            name: 'soundSetsList',
            apiOptions: {
                resource: 'soundsets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: `${item.id}-${item.name}`,
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
                    number
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
