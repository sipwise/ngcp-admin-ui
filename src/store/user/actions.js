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
} from 'src/local-storage'
import {
    PATH_ENTRANCE,
    PATH_LOGIN
} from 'src/router/common'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import {
    getCapabilitiesWithoutError, getPlatformInfo
} from 'src/api/user'
import { i18n } from 'boot/i18n'
import { apiFetchEntity, httpApi } from 'src/api/ngcpAPI'
import { ajaxGet, ajaxPost } from 'src/api/ngcpPanelAPI'
import { getCurrentLangAsV1Format } from 'src/i18n'
import _ from 'lodash'

export async function login ({ commit, getters, dispatch }, options) {
    commit('loginRequesting')
    let res
    try {
        res = await ajaxPost('/login_jwt', {
            username: options.username,
            password: options.password
        })
    } catch (err) {
        if ([403, 422].includes(err?.response?.status)) {
            commit('loginFailed', i18n.t('Wrong credentials'))
        } else {
            commit('loginFailed', i18n.t('Unexpected error'))
            throw err
        }
    }

    if (res?.data?.jwt) {
        setJwt(res.data.jwt)
        await dispatch('loadUser')

        if (hasJwt()) {
            this.$aclSet(getters.permissions)
            try {
                await this.$router.push({ path: PATH_ENTRANCE })
            } catch (e) {
                commit('loginFailed', i18n.t('Internal error'))
            }
        } else {
            commit('loginFailed', i18n.t('Internal error'))
        }
    } else {
        commit('loginFailed', i18n.t('Wrong credentials'))
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
        console.error('Error loading user')
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
            console.error('Cloud not logout from v1 properly')
            console.error(err)
        } finally {
            commit('logoutSucceeded')
            this.$router.push({ path: PATH_LOGIN })
                .catch(error => {
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
    const res = await httpApi.get('/' + options.entity + '/' + options.id)
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
        favPages: favPages
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
        favPages: favPages
    })
}

export async function deleteFavPage ({ context, commit }, { path }) {
    const favPages = getLocal('favPages') || {}
    delete favPages[path]
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages: favPages
    })
}
