import {
    LocalStorage
} from 'quasar'

import {
    getJwt,
    setJwt,
    hasJwt,
    deleteJwt,
    getAdminId
} from 'src/auth'
import {
    getLocal,
    setLocal
} from 'src/storage'
import {
    PATH_ENTRANCE,
    PATH_LOGIN
} from 'src/router/common'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import {
    getCapabilitiesWithoutError
} from 'src/api/user'

export async function login ({ commit, getters }, options) {
    commit('loginRequesting')
    try {
        const res = await this.$httpPanel.post('/admin_login_jwt', {
            username: options.username,
            password: options.password
        })
        setJwt(res.data.jwt)
        const userData = await Promise.all([
            this.$apiFetchEntity('admins', getAdminId()),
            getCapabilitiesWithoutError()
        ])
        if (userData[0] !== null) {
            commit('loginSucceeded', {
                user: userData[0],
                jwt: res.data.jwt,
                capabilities: userData[1]
            })
            commit('settingsSucceeded', {
                favPages: getLocal('favPages')
            })
            this.$aclSet(getters.permissions)
            await this.$router.push({ path: PATH_ENTRANCE })
        } else {
            commit('loginFailed', 'Wrong credentials')
        }
    } catch (err) {
        if ([403, 422].includes(err?.response?.status)) {
            commit('loginFailed', 'Wrong credentials')
        } else {
            commit('loginFailed', 'Unexpected error')
            throw err
        }
    }
}

export async function loadUser ({ commit, dispatch }) {
    try {
        if (hasJwt()) {
            const userData = await Promise.all([
                this.$apiFetchEntity('admins', getAdminId()),
                getCapabilitiesWithoutError()
            ])
            if (userData[0] !== null) {
                commit('loginSucceeded', {
                    user: userData[0],
                    jwt: getJwt(),
                    capabilities: userData[1]
                })
                commit('settingsSucceeded', {
                    favPages: getLocal('favPages')
                })
            } else {
                dispatch('logout')
            }
        } else {
            dispatch('logout')
        }
    } catch (err) {
        console.debug('Error loading user')
        console.error(err)
        dispatch('logout')
        showGlobalErrorMessage(err)
    }
}

export async function logout ({ commit }) {
    commit('logoutRequesting')
    deleteJwt()
    if (this.$aclReset) {
        this.$aclReset()
    }
    try {
        await this.$httpPanel.get('/ajax_logout')
    } catch (err) {
        console.debug('Cloud not logout from v1 properly')
        console.error(err)
    } finally {
        commit('logoutSucceeded')
        let pathname = document.location.pathname
        if (pathname === undefined || pathname === null || pathname === '') {
            pathname = '/'
        }
        document.location.href = pathname + '#' + PATH_LOGIN
    }
}

export async function closeGoToOldAdminPanelInfo ({ commit }) {
    LocalStorage.set('aui_ngcpGoToOldAdminPanelInfo', false)
    commit('changeGoToOldAdminPanel', false)
}

export async function loadGoToOldAdminPanelInfo ({ commit }) {
    commit('changeGoToOldAdminPanel', LocalStorage.getItem('aui_ngcpGoToOldAdminPanelInfo'))
}

export async function goToOldAdminPanel ({ state }) {
    document.location.href = this.$appConfig.ngcpPanelUrl + state.currentPath + '?framed=0'
}

export async function loadEntity ({ commit }, options) {
    commit('entityLoadRequesting')
    const res = await this.$httpApi.get('/' + options.entity + '/' + options.id)
    if (res.status >= 200 && res.status <= 299) {
        commit('entityLoadSucceeded', res.data)
    } else {
        commit('entityLoadFailed', res.data.message)
    }
}

export async function pinMenu (context) {
    setLocal('menuPinned', !context.state.menuPinned)
    context.commit('pinMenu', getLocal('menuPinned'))
}

export async function loadMenuState (context) {
    context.commit('pinMenu', getLocal('menuPinned'))
}

export async function passwordReset ({ commit }, data) {
    commit('newPasswordRequesting', true)
    const response = await this.$httpApi.post('/passwordreset/', data)
    commit('newPasswordRequesting', false)
    return response
}

export async function addFavPage ({ context, commit }, route) {
    const favPages = getLocal('favPages')
    favPages[route.path] = true
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages: favPages
    })
}

export async function removeFavPage ({ context, commit }, route) {
    const favPages = getLocal('favPages')
    delete favPages[route.path]
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages: favPages
    })
}

export async function toggleFavPage ({ context, commit }, route) {
    let favPages = getLocal('favPages')
    if (!favPages) {
        favPages = {}
    }
    if (favPages[route.path]) {
        delete favPages[route.path]
    } else {
        favPages[route.path] = true
    }
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages: favPages
    })
}
