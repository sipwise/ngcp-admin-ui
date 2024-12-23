export function resetSysStatCardInfo (state) {
    state.sysStatCardInfo = {}
    state.sysStatCardInfoHasError = false
}

export function sysStatCardInfoLoaded (state, { data, hasError = false }) {
    state.sysStatCardInfo = data
    state.sysStatCardInfoHasError = hasError
}

export function resetBillingCardInfo (state) {
    state.billingCardInfo = {}
    state.billingCardInfoHasError = false
}

export function billingCardInfoLoaded (state, { data, hasError = false }) {
    state.billingCardInfo = data
    state.billingCardInfoHasError = hasError
}

export function resetPeeringCardInfo (state) {
    state.peeringCardInfo = {}
    state.peeringCardInfoHasError = false
}

export function peeringCardInfoLoaded (state, { data, hasError = false }) {
    state.peeringCardInfo = data
    state.peeringCardInfoHasError = hasError
}

export function resetResellersCardInfo (state) {
    state.resellersCardInfo = {}
    state.resellersCardInfoHasError = false
}

export function resellersCardInfoLoaded (state, { data, hasError = false }) {
    state.resellersCardInfo = data
    state.resellersCardInfoHasError = hasError
}

export function resetCustomerCardInfo (state) {
    state.customerCardInfo = {}
    state.customerCardInfoHasError = false
}

export function customerCardInfoLoaded (state, { data, hasError = false }) {
    state.customerCardInfo = data
    state.customerCardInfoHasError = hasError
}

export function resetDomainCardInfo (state) {
    state.domainCardInfo = {}
    state.domainCardInfoHasError = false
}

export function domainCardInfoLoaded (state, { data, hasError = false }) {
    state.domainCardInfo = data
    state.domainCardInfoHasError = hasError
}
