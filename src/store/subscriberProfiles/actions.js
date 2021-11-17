import { apiPostMinimal } from 'src/api/ngcpAPI'

export async function createProfileSet ({ commit }, data) {
    return apiPostMinimal({ resource: 'subscriberprofilesets', data })
}
