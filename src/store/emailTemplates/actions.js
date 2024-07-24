import { apiPost, apiPut } from 'src/api/ngcpAPI'

export async function updateEmailTemplate ({ commit }, data) {
    return apiPut({
        resource: 'emailtemplates',
        resourceId: data.id,
        data: data.payload
    })
}

export async function createEmailTemplate ({ commit }, data) {
    const payload = {
        attachment_name: data.attachment_name,
        reseller_id: data.reseller_id,
        subject: data.subject,
        body: data.body,
        name: data.name,
        from_email: data.fromEmail
    }

    return apiPost({ resource: 'emailtemplates', data: payload })
}
