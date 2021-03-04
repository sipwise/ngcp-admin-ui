export async function createContact ({ commit }, data) {
	return this.$httpApi.post('/customercontacts/', data)
}
