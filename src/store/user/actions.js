import { i18n } from 'boot/i18n'
import _ from 'lodash'
import { apiFetchEntity, httpApi } from 'src/api/ngcpAPI'
import { ajaxGet, ajaxPost } from 'src/api/ngcpPanelAPI'
import { getCapabilitiesWithoutError, getPlatformInfo } from 'src/api/user'
import {
    deleteJwt,
    getAdminId,
    getJwt,
    hasJwt,
    setJwt
} from 'src/auth'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import { getCurrentLangAsV1Format } from 'src/i18n'
import {
    delSessionStorage,
    getLocal, getSessionStorage, setLocal
} from 'src/local-storage'
import { PATH_ENTRANCE, PATH_LOGIN } from 'src/router/common'

export async function login ({ commit, getters, state, dispatch }, options) {
    commit('loginRequesting')
    let res
    try {
        res = await ajaxPost('/login_jwt', {
            username: options.username,
            password: options.password
        })
    } catch (err) {
        if ([403, 422].includes(err?.response?.status)) {
            commit('loginFailed', i18n.global.t('Wrong credentials'))
        } else if ([403].includes(err?.response?.status) && ['Banned'].includes(err?.response?.data?.message)) {
            commit('loginFailed', i18n.global.t('There is a problem with your account, please contact support'))
            throw err
        } else {
            commit('loginFailed', i18n.global.t('Unexpected error'))
            throw err
        }
    }
    if (res?.data?.jwt) {
        setJwt(res.data.jwt)
        const lastRole = getLocal('last_role')
        await dispatch('loadUser')
        const hasRole = _.isString(state.user?.role)
        const hasDifferentRole = _.isString(lastRole) && hasRole && lastRole !== state.user?.role
        if (hasRole) {
            setLocal('last_role', state.user.role)
        }

        if (hasJwt()) {
            this.$aclSet(getters.permissions)
            try {
                const preLoginPath = getSessionStorage('preLoginPath')
                let loginPath = preLoginPath || PATH_ENTRANCE
                const lastPage = getSessionStorage('last_page')
                if (lastPage && !hasDifferentRole) {
                    loginPath = lastPage
                }
                delSessionStorage('preLoginPath')
                await this.$router.push({ path: loginPath })
            } catch (e) {
                commit('loginFailed', i18n.global.t('Internal error'))
            }
        } else {
            commit('loginFailed', i18n.global.t('Internal error'))
        }
    } else {
        commit('loginFailed', i18n.global.t('Wrong credentials'))
    }
}

export async function loadUser ({ commit, dispatch }) {
    try {
        if (hasJwt()) {
            const userData = await Promise.all([
                apiFetchEntity('admins', getAdminId()),
                getCapabilitiesWithoutError(), // TODO: switch to "getCapabilities" function when "capabilities" endpoint will be fixed for "ccare\ccareadmin" users. It should not return 403 error.
                getPlatformInfo()
            ])
            if (userData[0] !== null) {
                commit('loginSucceeded', {
                    user: userData[0],
                    jwt: getJwt(),
                    capabilities: userData[1],
                    platformInfo: userData[2]
                })
                commit('settingsSucceeded', {
                    favPages: getLocal('favPages') || {}
                })
            } else {
                await dispatch('logout')
            }
        } else {
            await dispatch('logout')
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading user')
        // eslint-disable-next-line no-console
        console.error(err)
        showGlobalErrorMessage(err)
        await dispatch('logout')
    }
}

export async function logout ({ commit, state }) {
    if (state?.loginState !== 'loggingOut' || hasJwt()) {
        commit('logoutRequesting')
        deleteJwt()
        if (this.$aclReset) {
            this.$aclReset()
        }
        try {
            await ajaxGet('/ajax_logout')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Cloud not logout from v1 properly')
            // eslint-disable-next-line no-console
            console.error(err)
        } finally {
            commit('logoutSucceeded')
            this.$router.push({ path: PATH_LOGIN })
                .catch((error) => {
                    if (error?.name !== 'NavigationDuplicated') {
                        throw error
                    }
                })
        }
    }
}

export async function closeGoToOldAdminPanelInfo ({ commit }) {
    setLocal('ngcpGoToOldAdminPanelInfo', false)
    commit('changeGoToOldAdminPanel', false)
}

export async function loadGoToOldAdminPanelInfo ({ commit }) {
    commit('changeGoToOldAdminPanel', getLocal('ngcpGoToOldAdminPanelInfo'))
}

export async function goToOldAdminPanel ({ state }) {
    const baseUrl = (_.isString(this.$appConfig.ngcpPanelUrl) && _.trim(this.$appConfig.ngcpPanelUrl) !== '')
        ? this.$appConfig.ngcpPanelUrl
        : location.origin
    const goToUrl = new URL(state.currentGoToPath, baseUrl)
    goToUrl.searchParams.set('framed', '0')
    goToUrl.searchParams.set('lang', getCurrentLangAsV1Format())
    document.location.href = goToUrl.toString()
}

export async function loadEntity ({ commit }, options) {
    commit('entityLoadRequesting')
    const res = await httpApi.get(`/${options.entity}/${options.id}`)
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
    const response = await httpApi.post('/passwordreset/', data)
    commit('newPasswordRequesting', false)
    return response
}

export async function updateFavPages ({ commit }) {
    const favPages = getLocal('favPages') || {}
    Object.keys(favPages).forEach((favPagePath) => {
        const meta = this.$routeMeta.$routePathMeta({ path: favPagePath })
        favPages[favPagePath].icon = meta.icon
        favPages[favPagePath].label = meta.label
    })
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages
    })
}

export async function toggleFavPage ({ context, commit }, { route }) {
    const routePathMeta = this.$routeMeta.$routePathMeta(route)
    const page = {
        icon: routePathMeta.icon,
        label: routePathMeta.label
    }
    const favPages = getLocal('favPages') || {}
    if (favPages[route.path]) {
        delete favPages[route.path]
    } else {
        favPages[route.path] = page
    }
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages
    })
}

export async function deleteFavPage ({ context, commit }, { path }) {
    const favPages = getLocal('favPages') || {}
    delete favPages[path]
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages
    })
}
