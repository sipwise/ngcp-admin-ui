import { CURRENCY_DEFAULT_LOCALE } from 'src/constants'

export function idAndNameLabel (item) {
    if (item) {
        return '#' + item.id + ' - ' + item.name
    } else {
        return null
    }
}
export function idAndZoneLabel (item) {
    if (item) {
        return '#' + item.id + ' - ' + item.zone
    } else {
        return null
    }
}

export function billingProfileLabel (billingProfile) {
    if (billingProfile) {
        return '#' + billingProfile.id + ' - ' + billingProfile.name + ' (' + billingProfile.handle + ')'
    } else {
        return null
    }
}

export function billingNetworkLabel (billingNetwork) {
    return idAndNameLabel(billingNetwork)
}

export function profilePackageLabel (profilePackage) {
    return idAndNameLabel(profilePackage)
}

export function contactLabel (contact) {
    if (contact) {
        return '#' + contact.id + ' - ' + contact.email
    } else {
        return null
    }
}

export function emailTemplateLabel (emailTemplate) {
    return idAndNameLabel(emailTemplate)
}

export function resellerLabel (reseller) {
    return idAndNameLabel(reseller)
}

// Todo: Integrate configured system currency
export function currencyLike (number) {
    return new Intl.NumberFormat(CURRENCY_DEFAULT_LOCALE, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number)
}

export function formatPhoneNumber (numberObj = {}, delimiter = ' ') {
    return [numberObj.cc, numberObj.ac, numberObj.sn].join(delimiter)
}
export function formatTimeset (cfu) {
    return cfu.map(item => item.timeset)
}
export function formatSource (cfu) {
    return cfu.map(item => item.sourceset)
}
export function formatBNumber (cfu) {
    return cfu.map(item => item.bnumberset)
}
export function formatDestination (cfu) {
    return cfu.map(item => item.destinationset)
}
export function formatEnable (cfu) {
    return cfu.map(item => item.enabled)
}
export function formatPSTN (cfu) {
    return cfu.map(item => item.use_redirection)
}
export function formatGroupMember (groupMember) {
    if (groupMember) {
        return groupMember.username + '@' + groupMember.domain
    } else {
        return null
    }
}
