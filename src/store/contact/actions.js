export async function createCustomerContact ({ commit }, data) {
    return this.$httpApi.post('/customercontacts/', data)
}

export async function createSystemContact ({ commit }, data) {
    return this.$httpApi.post('/systemcontacts/', data)
}
