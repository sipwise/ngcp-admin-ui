import { ajaxGet } from 'src/api/ngcpPanelAPI'

async function processAjaxWidgetDataRequests (requests) {
    const resData = {}
    Object.entries(requests).forEach(([name, promise]) => {
        promise.then((r) => {
            resData[name] = (Number(r?.status) === 200) ? r?.data?.widget_data : null
        }).catch((e) => {
            resData[name] = undefined
            throw e
        })
    })
    const res = await Promise.allSettled(Object.values(requests))
    const hasError = res.some((r) => r.status === 'rejected')

    return { data: resData, hasError }
}

// TODO: should be replaced with API endpoint when it be implemented
export async function fetchSysStatCardInfo ({ commit }) {
    commit('resetSysStatCardInfo')

    const requestData = {
        params: {
            widget: 'AdminSystemOverview'
        }
    }
    const emergencyMode = ajaxGet('/dashboard/ajax/emergency_mode', requestData)
    const overallStatus = ajaxGet('/dashboard/ajax/overall_status', requestData)
    const requests = {
        emergencyMode,
        overallStatus
    }
    const results = await processAjaxWidgetDataRequests(requests)

    // "overallStatus.class" value is very specific to "ngcp-panel" V1 code, so let's transform it to be something more generic
    if (results.data?.overallStatus) {
        const ajaxClassesNamesToStatusMap = {
            'ngcp-red-error': 'error',
            'ngcp-orange-warning': 'warning',
            'ngcp-green-ok': 'ok'
        }
        results.data.overallStatus.status = ajaxClassesNamesToStatusMap[results.data.overallStatus?.class]
    }

    commit('sysStatCardInfoLoaded', results)
}

// TODO: should be replaced with API endpoint when it be implemented
export async function fetchBillingCardInfo ({ commit, rootGetters }) {
    commit('resetBillingCardInfo')

    let requests = {}
    const userRole = rootGetters['user/userRole']
    if (userRole === 'admin') {
        const requestData = {
            params: {
                widget: 'AdminBillingOverview'
            }
        }
        const profilesCount = ajaxGet('/dashboard/ajax/profiles_count', requestData)
        const peeringSum = ajaxGet('/dashboard/ajax/peering_sum', requestData)
        const resellerSum = ajaxGet('/dashboard/ajax/reseller_sum', requestData)
        const customerSum = ajaxGet('/dashboard/ajax/customer_sum', requestData)
        requests = {
            profiles: profilesCount,
            peeringSum,
            resellerSum,
            customerSum
        }
    } else if (userRole === 'reseller') {
        const requestData = {
            params: {
                widget: 'ResellerBillingOverview'
            }
        }
        const profilesCount = ajaxGet('/dashboard/ajax/profiles_count', requestData)
        const resellerSum = ajaxGet('/dashboard/ajax/reseller_sum', requestData)
        const customerSum = ajaxGet('/dashboard/ajax/customer_sum', requestData)
        requests = {
            profiles: profilesCount,
            resellerSum,
            customerSum
        }
    }

    const results = await processAjaxWidgetDataRequests(requests)
    commit('billingCardInfoLoaded', results)
}

// TODO: should be replaced with API endpoint when it be implemented
export async function fetchPeeringCardInfo ({ commit }) {
    commit('resetPeeringCardInfo')

    const requestData = {
        params: {
            widget: 'AdminPeeringOverview'
        }
    }
    const groupsCount = ajaxGet('/dashboard/ajax/groups_count', requestData)
    const serversCount = ajaxGet('/dashboard/ajax/hosts_count', requestData)
    const rulesCount = ajaxGet('/dashboard/ajax/rules_count', requestData)
    const requests = {
        groups: groupsCount,
        servers: serversCount,
        rules: rulesCount
    }
    const results = await processAjaxWidgetDataRequests(requests)
    commit('peeringCardInfoLoaded', results)
}

// TODO: should be replaced with API endpoint when it be implemented
export async function fetchResellerCardInfo ({ commit }) {
    commit('resetResellersCardInfo')

    const requestData = {
        params: {
            widget: 'AdminResellerOverview'
        }
    }
    const resellerCount = ajaxGet('/dashboard/ajax/resellers_count', requestData)
    const domainsCount = ajaxGet('/dashboard/ajax/domains_count', requestData)
    const customersCount = ajaxGet('/dashboard/ajax/customers_count', requestData)
    const subscribersCount = ajaxGet('/dashboard/ajax/subscribers_count', requestData)
    const requests = {
        resellers: resellerCount,
        domains: domainsCount,
        customers: customersCount,
        subscribers: subscribersCount
    }
    const results = await processAjaxWidgetDataRequests(requests)
    commit('resellersCardInfoLoaded', results)
}

// TODO: should be replaced with API endpoint when it be implemented
export async function fetchCustomerCardInfo ({ commit, rootGetters }) {
    commit('resetCustomerCardInfo')

    let requestData = {}
    const userRole = rootGetters['user/userRole']
    if (userRole === 'reseller') {
        requestData = {
            params: {
                widget: 'ResellerCustomerOverview'
            }
        }
    } else if (userRole === 'ccare' || userRole === 'ccareadmin') {
        requestData = {
            params: {
                widget: 'CCareCustomerOverview'
            }
        }
    }
    const customersCount = ajaxGet('/dashboard/ajax/customers_count', requestData)
    const contactsCount = ajaxGet('/dashboard/ajax/contacts_count', requestData)
    const subscribersCount = ajaxGet('/dashboard/ajax/subscribers_count', requestData)
    const requests = {
        customers: customersCount,
        contacts: contactsCount,
        subscribers: subscribersCount
    }
    const results = await processAjaxWidgetDataRequests(requests)
    commit('customerCardInfoLoaded', results)
}

// TODO: should be replaced with API endpoint when it be implemented
export async function fetchDomainCardInfo ({ commit }) {
    commit('resetDomainCardInfo')

    const requestData = {
        params: {
            widget: 'ResellerDomainOverview'
        }
    }
    const domainsCount = ajaxGet('/dashboard/ajax/domains_count', requestData)
    const rewriteRuleSetCount = ajaxGet('/dashboard/ajax/rwr_sets_count', requestData)
    const soundSetsCount = ajaxGet('/dashboard/ajax/sound_sets_count', requestData)
    const requests = {
        domains: domainsCount,
        rewriteRuleSets: rewriteRuleSetCount,
        soundSets: soundSetsCount
    }
    const results = await processAjaxWidgetDataRequests(requests)
    commit('domainCardInfoLoaded', results)
}
