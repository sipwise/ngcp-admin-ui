export async function createDomain ({ commit }, data) {
    return this.$httpApi.post('/domains/', data)
}
