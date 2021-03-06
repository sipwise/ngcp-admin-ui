
import saveAs from 'file-saver'
import Qs from 'qs'
import { apiFetchEntity, apiGet, apiPatchReplace, apiPost, apiPostBlob, apiPut, httpApi } from 'src/api/ngcpAPI'
import { ajaxPost } from 'src/api/ngcpPanelAPI'

export async function createAdministrator (context, data) {
    await apiPost({
        resource: 'admins',
        data: data
    })
}

export async function updateAdministrator (context, payload) {
    const resourceId = payload.id
    delete payload.id
    await apiPut({
        resource: 'admins',
        resourceId: resourceId,
        data: payload
    })
}

export async function loadAdministrator ({ commit, dispatch }, id) {
    commit('adminRequesting')
    const admin = await apiFetchEntity('admins', id)
    if (admin !== null) {
        const reseller = await apiFetchEntity('resellers', admin.reseller_id)
        if (reseller !== null) {
            commit('adminSucceeded', {
                admin: admin,
                reseller: reseller
            })
        } else {
            commit('adminFailed')
        }
    } else {
        commit('adminFailed')
    }
}

export async function changeAdministratorPassword (context, payload) {
    await apiPatchReplace({
        resource: 'admins',
        resourceId: context.rootGetters['user/userId'],
        field: 'password',
        value: payload.password
    })
}

export async function recoverAdministratorPassword ({ commit, dispatch, state, rootGetters }, data) {
    commit('user/dialogRequesting', null, { root: true })
    try {
        const res = await httpApi.post('/passwordrecovery/', {
            new_password: data.password,
            token: data.token
        })
        if (res.status === 200 || res.status === 201) {
            commit('user/dialogSucceeded', true, { root: true })
        } else {
            commit('user/dialogFailed', true, { root: true })
        }
    } catch (err) {
        commit('user/dialogFailed', true, { root: true })
    }
}

export async function createAdminCertificate (context, admin) {
    const resCreate = await apiPostBlob({
        resource: 'admincerts',
        data: {
            login: admin.login
        }
    })
    saveAs(resCreate.data, 'ngcp-api-certificate.zip')
    const resExists = await apiGet({
        resource: 'admincerts',
        resourceId: admin.id
    })
    context.commit('adminCertSucceeded', {
        hasAdminCertificate: (resExists.data.has_certificate !== 0)
    })
}

export async function downloadCACertificate (context, id) {
    const res = await ajaxPost('/administrator/' + id + '/api_key', Qs.stringify({
        submitid: '',
        'ca.download': 'Download CA Cert'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }))
    saveAs(new Blob([res.data], { type: 'application/x-x509-ca-cert' }), 'ngcp-ca.pem')
}

export async function revokeAdminCertificate ({ commit, state }, admin) {
    commit('adminCertRequesting')
    try {
        await httpApi.delete('/admincerts/' + admin.id)
        const res = await httpApi.get('/admincerts/' + admin.id)
        commit('adminCertSucceeded', {
            hasAdminCertificate: (res.data.has_certificate !== 0)
        })
    } catch (err) {
        commit('adminCertFailed', err.message)
    }
}

export async function hasAdminCertificate ({ commit, state }, admin) {
    commit('adminCertRequesting')
    try {
        const res = await httpApi.get('/admincerts/' + admin.id)
        commit('adminCertSucceeded', {
            hasAdminCertificate: (res.data.has_certificate !== 0)
        })
    } catch (err) {
        commit('adminCertFailed', err.message)
    }
}
