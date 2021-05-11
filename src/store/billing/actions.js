import { apiPost } from 'src/api/ngcpAPI'

export async function createBillingProfile ({ commit }, data) {
    return await apiPost({
        resource: 'billingprofiles',
        data: data
    })
}
