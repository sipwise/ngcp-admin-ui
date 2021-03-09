
import saveAs from 'file-saver'
import Qs from 'qs'
import {
    apiGet, apiPatchReplace,
    apiPost, apiPostBlob,
    apiPut
} from 'src/api/common'
import {
    handleGlobalActionError,
    resetGlobalActionError
} from 'src/store/error'

export async function createAdministrator (context, data) {
    try {
        resetGlobalActionError(context)
        await apiPost({
            resource: 'admins',
            data: data
        })
        await this.$router.push({
            path: '/administrator'
        })
    } catch (err) {
        handleGlobalActionError(context, err)
    }
}

export async function updateAdministrator (context, payload) {
    try {
        resetGlobalActionError(context)
        const admin = await apiPut({
            resource: 'admins',
            resourceId: payload.resourceId,
            data: payload.data
        })
        const reseller = await apiGet('resellers', admin.reseller_id)
        context.commit('adminSucceeded', {
            admin: admin,
            reseller: reseller
        })
    } catch (err) {
        handleGlobalActionError(context, err)
    }
}

export async function loadAdministrator ({ commit, dispatch }, id) {
    commit('adminRequesting')
    const admin = await this.$apiFetchEntity('admins', id)
    if (admin !== null) {
        const reseller = await this.$apiFetchEntity('resellers', admin.reseller_id)
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
    try {
        resetGlobalActionError(context)
        await apiPatchReplace({
            resource: 'admins',
            resourceId: context.rootGetters['user/userId'],
            field: 'password',
            value: payload.password
        })
    } catch (err) {
        handleGlobalActionError(context, err)
    }
}

export async function recoverAdministratorPassword ({ commit, dispatch, state, rootGetters }, data) {
    commit('user/dialogRequesting', null, { root: true })
    try {
        const res = await this.$httpApi.post('/passwordrecovery/', {
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
    try {
        resetGlobalActionError(context)
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
    } catch (err) {
        handleGlobalActionError(context, err)
    }
}

export async function downloadCACertificate (context, id) {
    try {
        resetGlobalActionError(context)
        const res = await this.$httpPanel.post('/administrator/' + id + '/api_key', Qs.stringify({
            submitid: '',
            'ca.download': 'Download CA Cert'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }))
        saveAs(new Blob([res.data], { type: 'application/x-x509-ca-cert' }), 'ngcp-ca.pem')
    } catch (err) {
        handleGlobalActionError(context, err)
    }
}

export async function revokeAdminCertificate ({ commit, state }, admin) {
    commit('adminCertRequesting')
    try {
        await this.$httpApi.delete('/admincerts/' + admin.id)
        const res = await this.$httpApi.get('/admincerts/' + admin.id)
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
        const res = await this.$httpApi.get('/admincerts/' + admin.id)
        commit('adminCertSucceeded', {
            hasAdminCertificate: (res.data.has_certificate !== 0)
        })
    } catch (err) {
        commit('adminCertFailed', err.message)
    }
}
