export async function createCustomer ({ commit }, data) {
	return this.$httpApi.post('/customers/', data)
}
