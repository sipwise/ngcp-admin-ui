import { apiPut } from 'src/api/ngcpAPI'

export async function updateEmailTemplate ({ commit }, data) {
    return apiPut({
        resource: 'emailtemplates',
        resourceId: data.id,
        data: data.payload
    })
}
